# New Blog Post

Create a new blog post with the given title.

## Steps

1. **Switch to main and pull latest:**
   ```bash
   git checkout main && git pull origin main
   ```

2. **Determine the branch name** by finding the current year and next sequence number:
   ```bash
   YEAR=$(date +%Y)
   LAST_SEQ=$(find "posts/${YEAR}" -maxdepth 1 -mindepth 1 -type d 2>/dev/null \
     | sed 's|.*/||' | grep -oE '^[0-9]+' | sort -n | tail -1 || echo "0")
   NEXT_SEQ=$(printf "%03d" $(( ${LAST_SEQ:-0} + 1 )))
   echo "Branch: ${YEAR}-${NEXT_SEQ}"
   ```

3. **Create and switch to the new branch:**
   ```bash
   git checkout -b "${YEAR}-${NEXT_SEQ}"
   ```

4. **Scaffold the post** using mise (ask the user for a title if not provided):
   ```bash
   mise run new-post "<title>"
   ```

5. **Open the generated `index.qmd`** for editing. The output of the mise command shows the created file path.

6. Remind the user to:
   - Fill in the `description` field (used for Open Graph previews)
   - Add references to `refs.bib` as needed
   - Set `draft: false` when ready to publish
