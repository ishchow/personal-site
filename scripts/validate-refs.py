#!/usr/bin/env python3
"""Validate that QMD citations match entries in the configured BibTeX file."""

import re
import sys
from pathlib import Path

import bibtexparser
import yaml


CITATION_RE = re.compile(r"(?<![\\\w])@([A-Za-z0-9][A-Za-z0-9:._/-]*)")
CROSSREF_PREFIXES = (
    "alg-",
    "apx-",
    "ch-",
    "cor-",
    "def-",
    "eq-",
    "exm-",
    "fig-",
    "lem-",
    "lst-",
    "nte-",
    "prp-",
    "rem-",
    "sec-",
    "sol-",
    "tbl-",
    "thm-",
    "tip-",
    "wrn-",
)


def normalize_key(value: str) -> str:
    return value.strip().lower()


def parse_front_matter(text: str) -> tuple[dict[str, object], str]:
    lines = text.splitlines(keepends=True)

    if not lines or lines[0].strip() != "---":
        return {}, text

    for index in range(1, len(lines)):
        if lines[index].strip() in {"---", "..."}:
            front_matter = yaml.safe_load("".join(lines[1:index])) or {}

            if not isinstance(front_matter, dict):
                print("Error: YAML front matter must be a mapping", file=sys.stderr)
                sys.exit(1)

            return front_matter, "".join(lines[index + 1 :])

    print("Error: Unterminated YAML front matter", file=sys.stderr)
    sys.exit(1)


def strip_fenced_code_blocks(text: str) -> str:
    stripped_lines: list[str] = []
    in_fence = False
    fence_marker = ""

    for line in text.splitlines():
        candidate = line.lstrip()

        if not in_fence:
            match = re.match(r"(`{3,}|~{3,})", candidate)
            if match:
                in_fence = True
                fence_marker = match.group(1)
                continue

            stripped_lines.append(line)
            continue

        if candidate.startswith(fence_marker[0] * len(fence_marker)):
            in_fence = False
            fence_marker = ""

    return "\n".join(stripped_lines)


def strip_inline_code(text: str) -> str:
    return re.sub(r"`+[^`\n]*`+", " ", text)


def is_cross_reference(key: str) -> bool:
    normalized_key = normalize_key(key)
    return normalized_key.startswith(CROSSREF_PREFIXES)


def clean_citation_key(key: str) -> str:
    return normalize_key(key.rstrip(".,;:!?)]}"))


def extract_citation_keys(text: str) -> set[str]:
    content = strip_inline_code(strip_fenced_code_blocks(text))
    return {
        clean_citation_key(match.group(1))
        for match in CITATION_RE.finditer(content)
        if not is_cross_reference(clean_citation_key(match.group(1)))
    }


def resolve_bibliography_paths(front_matter: dict[str, object], qmd_path: Path) -> list[Path]:
    bibliography = front_matter.get("bibliography")

    if bibliography is None:
        print(f"Error: {qmd_path} does not define a bibliography", file=sys.stderr)
        sys.exit(1)

    if isinstance(bibliography, str):
        values = [bibliography]
    elif isinstance(bibliography, list) and all(isinstance(item, str) for item in bibliography):
        values = bibliography
    else:
        print(
            f"Error: bibliography in {qmd_path} must be a string or a list of strings",
            file=sys.stderr,
        )
        sys.exit(1)

    paths = [(qmd_path.parent / value).resolve() for value in values]

    for path in paths:
        if not path.exists():
            print(f"Error: bibliography file {path} does not exist", file=sys.stderr)
            sys.exit(1)

        if path.suffix != ".bib":
            print(f"Error: bibliography file {path} is not a .bib file", file=sys.stderr)
            sys.exit(1)

    return paths


def load_bibtex_keys(paths: list[Path]) -> tuple[set[str], set[str]]:
    keys: set[str] = set()
    duplicate_keys: set[str] = set()

    for path in paths:
        with path.open(encoding="utf-8") as file:
            parser = bibtexparser.bparser.BibTexParser(common_strings=True)
            parser.ignore_nonstandard_types = False
            bib_db = bibtexparser.load(file, parser=parser)

        for entry in bib_db.entries:
            entry_id = entry.get("ID", "")
            normalized_id = normalize_key(entry_id)

            if not normalized_id:
                continue

            if normalized_id in keys:
                duplicate_keys.add(normalized_id)

            keys.add(normalized_id)

    return keys, duplicate_keys


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: mise run validate-refs <path/to/file.qmd>", file=sys.stderr)
        sys.exit(1)

    qmd_path = Path(sys.argv[1]).resolve()

    if not qmd_path.exists():
        print(f"Error: {qmd_path} does not exist", file=sys.stderr)
        sys.exit(1)

    if qmd_path.suffix != ".qmd":
        print(f"Error: {qmd_path} is not a .qmd file", file=sys.stderr)
        sys.exit(1)

    text = qmd_path.read_text(encoding="utf-8")
    front_matter, body = parse_front_matter(text)
    bibliography_paths = resolve_bibliography_paths(front_matter, qmd_path)
    citation_keys = extract_citation_keys(body)
    bibtex_keys, duplicate_keys = load_bibtex_keys(bibliography_paths)

    missing_keys = sorted(citation_keys - bibtex_keys)
    unused_keys = sorted(bibtex_keys - citation_keys)

    if duplicate_keys or missing_keys:
        print(f"Validation failed for {qmd_path}", file=sys.stderr)

        if duplicate_keys:
            print("Duplicate BibTeX keys:", file=sys.stderr)
            for key in sorted(duplicate_keys):
                print(f"  - {key}", file=sys.stderr)

        if missing_keys:
            print("Missing bibliography entries for citations:", file=sys.stderr)
            for key in missing_keys:
                print(f"  - {key}", file=sys.stderr)

        sys.exit(1)

    if unused_keys:
        print(f"Unused bibliography entries in {qmd_path}:")
        for key in unused_keys:
            print(f"  - {key}")

    print(
        f"Validated {len(citation_keys)} citation(s) against {len(bibtex_keys)} BibTeX key(s) in {qmd_path}"
    )


if __name__ == "__main__":
    main()
