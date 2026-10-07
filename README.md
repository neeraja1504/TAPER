# TAPER reader

The reader for the TAPER study (Translation-Assisted Progressive English Reading).

- **Open the reader:** https://neeraja1504.github.io/TAPER/
- `index.html`: the reader only (one file, works in any browser). Pick a language, set the translation level, click terms, and check your understanding after reading.
- `create_form.gs`: Google Apps Script that creates the feedback Google Form (try the reader, rate it, compare it with an LLM).

## Making the Google Form

1. Go to https://script.google.com, click **New project** and paste in `create_form.gs`.
2. `TAPER_URL` at the top is already set to the reader link above.
3. Run `createTaperForm` and allow the permissions it asks for.
4. The execution log shows the form's edit link, the link for participants and the responses sheet.
