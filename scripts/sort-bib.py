#!/usr/bin/env python3
"""Sort a BibTeX file alphabetically by citation key."""

import sys
from pathlib import Path

import bibtexparser


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: mise run sort-bib <path/to/file.bib>", file=sys.stderr)
        sys.exit(1)

    bib_path = Path(sys.argv[1])

    if not bib_path.exists():
        print(f"Error: {bib_path} does not exist", file=sys.stderr)
        sys.exit(1)

    if bib_path.suffix != ".bib":
        print(f"Error: {bib_path} is not a .bib file", file=sys.stderr)
        sys.exit(1)

    with open(bib_path, encoding="utf-8") as f:
        parser = bibtexparser.bparser.BibTexParser(common_strings=True)
        parser.ignore_nonstandard_types = False
        bib_db = bibtexparser.load(f, parser=parser)

    bib_db.entries.sort(key=lambda entry: entry.get("ID", "").lower())

    writer = bibtexparser.bwriter.BibTexWriter()
    writer.indent = "  "

    with open(bib_path, "w", encoding="utf-8") as f:
        bibtexparser.dump(bib_db, f, writer=writer)

    print(f"Sorted {len(bib_db.entries)} entries in {bib_path}")


if __name__ == "__main__":
    main()
