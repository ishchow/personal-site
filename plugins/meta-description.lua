-- Meta description injector
-- Reads #post-excerpt for post pages, falls back to a default description,
-- and injects <meta name="description"> into <head>.

Plugin.require_version("4.0.0")

custom_options = soupault_config["custom_options"]

-- Get the description text
excerpt_elem = HTML.select_one(page, "p#post-excerpt")

if excerpt_elem then
  description = String.trim(HTML.strip_tags(excerpt_elem))
else
  description = config["default_description"]
end

if not description or description == "" then
  Log.warning("No description found and no default set, skipping meta description")
  Plugin.exit()
end

-- Escape HTML entities in the description
description = Regex.replace_all(description, '"', "&quot;")

-- Inject meta tag into <head>
head = HTML.select_one(page, "head")
if head then
  meta_tag = HTML.parse('<meta name="description" content="' .. description .. '">')
  HTML.append_child(head, meta_tag)
end
