/**
 * Creates the TAPER feedback form as a Google Form.
 * Participants answer a few background questions, try the TAPER reader,
 * then rate it, compare it with using an LLM, and give open feedback.
 *
 * How to run:
 *   1. Go to https://script.google.com and click "New project".
 *   2. Replace the code there with this whole file.
 *   3. Set TAPER_URL below to the public link of the reader (GitHub Pages).
 *   4. Click Run (function: createTaperForm) and allow the permissions it asks for.
 *   5. Open the Execution log for the edit link and the link to send to participants.
 */

// Public link to the TAPER reader, e.g. "https://<username>.github.io/<repo-name>/".
const TAPER_URL = "https://neeraja1504.github.io/TAPER/";

const LANGUAGES = [
  "Vietnamese · Tiếng Việt",
  "Spanish · Español",
  "Chinese (Simplified) · 中文",
  "Hindi · हिन्दी",
  "Korean · 한국어"
];

function createTaperForm() {
  if (!TAPER_URL) throw new Error("Set TAPER_URL at the top of the script to the reader's link first.");

  const form = FormApp.create("TAPER: Try the reader and tell us what you think");
  form.setDescription(
    "TAPER (Translation-Assisted Progressive English Reading) helps you read English technical papers " +
    "by showing them partly in your own language. You choose how much is translated, and you can move " +
    "toward full English as you get comfortable.\n\n" +
    "This form takes about 10–15 minutes. You'll answer a few questions, try the reader for about 5 minutes, " +
    "then tell us what you think. There are no right or wrong answers.\n\n" +
    "Reader: " + TAPER_URL
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);

  /* ---------- Page 1: about you ---------- */
  form.addSectionHeaderItem().setTitle("About you");

  form.addTextItem().setTitle("Participant ID")
    .setHelpText("The ID the study team gave you, e.g. P01.").setRequired(true);

  form.addListItem().setTitle("What is your first language?").setRequired(true)
    .setChoiceValues(LANGUAGES.concat(["Other"]));

  form.addTextItem().setTitle("If you chose Other, which language?");

  form.addTextItem().setTitle("Field of study").setHelpText("e.g. Computer Science");

  form.addScaleItem().setTitle("For me, reading English technical papers is…")
    .setBounds(1, 5).setLabels("Very hard", "Very easy").setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("How often do you use an LLM (ChatGPT, Claude, Gemini…) to help you read or understand English text?")
    .setChoiceValues(["Daily", "Weekly", "Monthly", "Rarely or never"]).setRequired(true);

  form.addCheckboxItem()
    .setTitle("When you read a hard English paper today, what do you do? (Choose all that apply)")
    .setChoiceValues([
      "Read it in English without help",
      "Ask an LLM to translate or explain it",
      "Paste it into Google Translate, DeepL or similar",
      "Look up single words",
      "Ask a classmate or advisor"
    ])
    .showOtherOption(true);

  /* ---------- Page 2: try the reader ---------- */
  form.addPageBreakItem()
    .setTitle("Try the TAPER reader")
    .setHelpText(
      "Open the reader in a new tab and spend about 5 minutes with it:\n" + TAPER_URL + "\n\n" +
      "TAPER is tunable for your language:\n" +
      "• Native language: pick your language (" + LANGUAGES.map(l => l.split(" · ")[0]).join(", ") + ").\n" +
      "• Translation level: drag the slider from \"All native\" (everything in your language) to \"All English\". " +
      "The middle levels keep technical terms in English or switch some sentences to English.\n" +
      "• Technical terms: click any highlighted term to see it in both English and your language.\n" +
      "• Week schedule: the reader can suggest a level that moves you toward full English over 12 weeks.\n\n" +
      "Try at least 3 different levels, click a few terms, and read one passage all the way through. " +
      "Then come back to this form."
    );

  form.addMultipleChoiceItem().setTitle("Did you open the reader and try it?")
    .setChoiceValues(["Yes, I tried it", "I opened it but couldn't get it to work"]).setRequired(true);

  form.addListItem().setTitle("Which language did you read in?").setRequired(true)
    .setChoiceValues(LANGUAGES.concat(["None of these is my language"]));

  form.addCheckboxItem().setTitle("Which translation levels did you try? (Choose all that apply)")
    .setChoiceValues([
      "All native",
      "Native, English terms in brackets",
      "Native text, technical terms in English",
      "Mixed: 25% of sentences in English",
      "Mixed: 50% of sentences in English",
      "Mixed: 75% of sentences in English",
      "All English"
    ]).setRequired(true);

  form.addMultipleChoiceItem().setTitle("Which level felt best for reading a technical paper today?")
    .setChoiceValues([
      "All native",
      "Native, English terms in brackets",
      "Native text, technical terms in English",
      "Mixed: 25% of sentences in English",
      "Mixed: 50% of sentences in English",
      "Mixed: 75% of sentences in English",
      "All English"
    ]).setRequired(true);

  /* ---------- Page 3: what you thought of TAPER ---------- */
  form.addPageBreakItem().setTitle("What did you think of TAPER?");

  form.addScaleItem().setTitle("Overall, how much did you like TAPER?")
    .setBounds(1, 5).setLabels("Not at all", "Very much").setRequired(true);

  form.addScaleItem().setTitle("How easy was TAPER to use?")
    .setBounds(1, 5).setLabels("Very hard", "Very easy").setRequired(true);

  form.addScaleItem().setTitle("How well did you understand the passage you read in TAPER?")
    .setBounds(1, 5).setLabels("Not at all", "Completely").setRequired(true);

  form.addScaleItem().setTitle("How good were the translations in your language?")
    .setBounds(1, 5).setLabels("Very poor", "Excellent").setRequired(true);

  form.addGridItem().setTitle("How useful was each feature?")
    .setRows([
      "Choosing my own language",
      "The translation level slider",
      "Seeing the English original side by side",
      "Clicking a term to see both languages",
      "The 12-week schedule toward full English"
    ])
    .setColumns(["Not useful", "A little useful", "Useful", "Very useful", "Didn't try it"])
    .setRequired(true);

  form.addScaleItem()
    .setTitle("Do you think TAPER would help you get better at reading English over time?")
    .setBounds(1, 5).setLabels("Not at all", "Definitely").setRequired(true);

  /* ---------- Page 4: TAPER vs an LLM ---------- */
  form.addPageBreakItem()
    .setTitle("TAPER compared with using an LLM")
    .setHelpText("Think about how you usually get help with English papers, for example asking ChatGPT or Claude to translate or explain.");

  form.addMultipleChoiceItem()
    .setTitle("To read an English technical paper, which would you rather use?")
    .setChoiceValues([
      "TAPER, definitely",
      "TAPER, probably",
      "No preference",
      "An LLM, probably",
      "An LLM, definitely"
    ]).setRequired(true);

  form.addParagraphTextItem().setTitle("Why?").setRequired(true);

  form.addGridItem().setTitle("Which is better for each of these?")
    .setRows([
      "Understanding the paper quickly",
      "Learning the English technical terms",
      "Improving my English reading over time",
      "Trusting that the translation is accurate",
      "Being easy to use"
    ])
    .setColumns(["TAPER", "About the same", "An LLM"])
    .setRequired(true);

  form.addMultipleChoiceItem().setTitle("Would you use TAPER together with an LLM?")
    .setChoiceValues([
      "Yes, I'd use both",
      "No, TAPER alone is enough",
      "No, I'd keep using only an LLM",
      "Not sure"
    ]).setRequired(true);

  /* ---------- Page 5: feedback ---------- */
  form.addPageBreakItem().setTitle("Your feedback");

  form.addParagraphTextItem().setTitle("What did you like most about TAPER?");

  form.addParagraphTextItem().setTitle("What was confusing or frustrating?");

  form.addParagraphTextItem().setTitle("What would you change or add?");

  form.addTextItem().setTitle("Which other languages should TAPER support?");

  form.addMultipleChoiceItem().setTitle("Would you like to take part in the full study?")
    .setHelpText("The full study runs over 12 weeks with short reading sessions.")
    .setChoiceValues(["Yes", "Maybe", "No"]);

  form.addParagraphTextItem().setTitle("Anything else you'd like to tell us?");

  form.setConfirmationMessage("Thank you! Your feedback helps us improve TAPER.");

  // Responses also go to a Google Sheet so they can be joined with the TAPER CSV by Participant ID.
  const sheet = SpreadsheetApp.create("TAPER: Feedback form (responses)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log("Edit the form:        " + form.getEditUrl());
  Logger.log("Send to participants: " + form.getPublishedUrl());
  Logger.log("Responses sheet:      " + sheet.getUrl());
}
