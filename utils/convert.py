from bs4 import BeautifulSoup, NavigableString, Comment
import re

def smarten_quotes(text):
    """Convert straight quotes and apostrophes in plain text to curly ones."""

    # Handle apostrophes (e.g., it's, don't)
    text = re.sub(r"(\w)'(\w)", r"\1’\2", text)

    # Handle double quotes smartly: alternate between opening and closing
    def replace_double_quotes(t):
        result = ''
        is_open = True
        for char in t:
            if char == '"':
                result += '“' if is_open else '”'
                is_open = not is_open
            else:
                result += char
        return result

    # Handle single quotes not part of contractions (standalone quotes)
    def replace_single_quotes(t):
        result = ''
        is_open = True
        for char in t:
            if char == "'":
                result += '‘' if is_open else '’'
                is_open = not is_open
            else:
                result += char
        return result

    # First process double quotes, then single quotes
    text = replace_double_quotes(text)
    text = replace_single_quotes(text)

    return text


def process_html(html_content):
    """Parse HTML and smarten quotes only in text nodes, skipping comments, scripts and styles."""
    soup = BeautifulSoup(html_content, 'html.parser')

    # Recursive function to process all text nodes
    def recursive_process(element):
        for content in element.contents:
            if isinstance(content, Comment):
                # Skip comments entirely
                continue
            elif isinstance(content, NavigableString):
                fixed_text = smarten_quotes(str(content))
                content.replace_with(fixed_text)
            elif content.name is not None:  # It's a tag
                # Only recurse into the tag if it's not script or style
                if content.name not in ['script', 'style']:
                    recursive_process(content)
                # Otherwise, skip its contents but continue with siblings

    recursive_process(soup)
    return str(soup)


# Example usage:
if __name__ == "__main__":
    # Load your HTML file
    with open("../classical.html", "r", encoding="utf-8") as file:
        html_data = file.read()

    # Process HTML content
    fixed_html = process_html(html_data)

    # Save the output to a new file
    with open("../classical_fixed.html", "w", encoding="utf-8") as file:
        file.write(fixed_html)

    print("Smart quotes and apostrophes replaced successfully.")
