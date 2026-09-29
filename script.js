"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const TEST_DURATION = 60;

const MIN_TARGET_WORDS = 30;
const MAX_TARGET_WORDS = 33;


/* =========================================================
   SENTENCE BANK
   ========================================================= */

const sentenceBank = [
    "Typing is a useful skill that improves with regular practice.",
    "Good typing habits can make everyday computer work faster.",
    "Learning to type accurately is more important than rushing.",
    "Regular practice helps build speed, accuracy, and confidence.",
    "A comfortable keyboard position can make typing easier.",
    "Focus on accuracy first and let your speed improve naturally.",
    "Short daily practice sessions can produce meaningful progress.",
    "Technology skills become easier when you practice them consistently.",
    "Typing quickly is useful for school, work, and communication.",
    "Good posture can help you stay comfortable while typing.",
    "Keep your fingers relaxed and avoid unnecessary movement.",
    "Reading carefully while typing can help reduce mistakes.",
    "Consistent practice is one of the simplest ways to improve.",
    "A calm approach can help you maintain better typing accuracy.",
    "Typing exercises can strengthen your familiarity with the keyboard.",
    "Learning keyboard patterns can make common words easier to type.",
    "Accuracy and speed usually improve together through regular practice.",
    "Set small goals and track your progress over time.",
    "Computer users can benefit from developing strong typing skills.",
    "Typing practice can improve confidence when working with digital tools.",
    "Take your time and concentrate on each character.",
    "Mistakes are useful because they show where more practice is needed.",
    "A steady rhythm can make typing feel more natural.",
    "Practice different sentences to become comfortable with varied words.",
    "Strong typing skills can save time during everyday computer tasks.",
    "Use both hands and keep your eyes focused on the text.",
    "Progress becomes easier to notice when you practice consistently.",
    "Simple exercises can help you become more familiar with the keyboard.",
    "Good accuracy creates a strong foundation for faster typing.",
    "Keep practicing and allow your skills to improve gradually."
];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const errorsElement = document.getElementById("errors");

const statusElement = document.getElementById("status");
const progressElement = document.getElementById("progress");
const progressFillElement = document.getElementById("progressFill");

const textDisplay = document.getElementById("textDisplay");
const typingInput = document.getElementById("typingInput");

const restartButton = document.getElementById("restartBtn");
const tryAgainButton = document.getElementById("tryAgainBtn");

const resultCard = document.getElementById("resultCard");

const finalWpmElement = document.getElementById("finalWpm");
const finalAccuracyElement = document.getElementById("finalAccuracy");
const finalErrorsElement = document.getElementById("finalErrors");

const correctWordsElement = document.getElementById("correctWords");
const mistypedWordsElement = document.getElementById("mistypedWords");
const untouchedWordsElement = document.getElementById("untouchedWords");
const totalWordsElement = document.getElementById("totalWords");

const yearElement = document.getElementById("year");


/* =========================================================
   STATE
   ========================================================= */

let targetText = "";

let timerId = null;

let testStarted = false;
let testFinished = false;

let startTime = 0;
let elapsedSeconds = 0;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});


function initializeApp() {
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    setupTypingProtection();
    setupModalSystem();
    setupButtons();

    startNewTest();
}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupButtons() {
    if (restartButton) {
        restartButton.addEventListener("click", startNewTest);
    }

    if (tryAgainButton) {
        tryAgainButton.addEventListener("click", startNewTest);
    }
}


/* =========================================================
   TEXT GENERATION
   ========================================================= */

function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(
            Math.random() * (i + 1)
        );

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];
    }

    return shuffled;
}


function countWords(text) {
    return text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;
}


function generateParagraph() {
    const shuffledSentences = shuffleArray(sentenceBank);

    const selectedSentences = [];
    let wordCount = 0;

    for (const sentence of shuffledSentences) {
        const sentenceWords = countWords(sentence);

        if (
            wordCount >= MIN_TARGET_WORDS &&
            wordCount + sentenceWords > MAX_TARGET_WORDS
        ) {
            continue;
        }

        selectedSentences.push(sentence);

        wordCount += sentenceWords;

        if (wordCount >= MIN_TARGET_WORDS) {
            break;
        }
    }

    /*
     * Fallback in case the selected sentences did not reach
     * the minimum target.
     */
    if (wordCount < MIN_TARGET_WORDS) {
        for (const sentence of sentenceBank) {
            if (!selectedSentences.includes(sentence)) {
                selectedSentences.push(sentence);

                wordCount += countWords(sentence);

                if (wordCount >= MIN_TARGET_WORDS) {
                    break;
                }
            }
        }
    }

    return selectedSentences.join(" ");
}


/* =========================================================
   TEXT RENDERING
   ========================================================= */

function renderTargetText() {
    textDisplay.textContent = "";

    const fragment = document.createDocumentFragment();

    for (const character of targetText) {
        const span = document.createElement("span");

        span.textContent = character;

        fragment.appendChild(span);
    }

    textDisplay.appendChild(fragment);
}


/* =========================================================
   NEW TEST
   ========================================================= */

function startNewTest() {
    stopTimer();

    targetText = generateParagraph();

    testStarted = false;
    testFinished = false;

    startTime = 0;
    elapsedSeconds = 0;

    typingInput.value = "";

    typingInput.disabled = false;

    resultCard.classList.add("hidden");

    renderTargetText();

    updateTimerDisplay(TEST_DURATION);

    updateLiveStatistics();

    updateProgress();

    setStatus(
        "Ready",
        "status-ready"
    );

    requestAnimationFrame(() => {
        typingInput.focus();
    });
}


/* =========================================================
   STATUS
   ========================================================= */

function setStatus(message, className) {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;

    statusElement.className = `status ${className}`;
}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {
    if (testStarted || testFinished) {
        return;
    }

    testStarted = true;

    startTime = performance.now();

    setStatus(
        "Typing",
        "status-running"
    );

    timerId = setInterval(
        updateTimer,
        100
    );
}


function updateTimer() {
    if (!testStarted || testFinished) {
        return;
    }

    elapsedSeconds = Math.min(
        TEST_DURATION,
        (performance.now() - startTime) / 1000
    );

    const remainingSeconds = Math.max(
        0,
        TEST_DURATION - elapsedSeconds
    );

    updateTimerDisplay(
        Math.ceil(remainingSeconds)
    );

    updateLiveStatistics();

    if (elapsedSeconds >= TEST_DURATION) {
        finishTest();
    }
}


function updateTimerDisplay(seconds) {
    if (!timerElement) {
        return;
    }

    timerElement.textContent = Math.max(
        0,
        Math.ceil(seconds)
    );
}


function stopTimer() {
    if (timerId !== null) {
        clearInterval(timerId);

        timerId = null;
    }
}


/* =========================================================
   INPUT HANDLING
   ========================================================= */

typingInput.addEventListener("input", handleTypingInput);


function handleTypingInput() {
    if (testFinished) {
        return;
    }

    const typedText = typingInput.value;

    if (!testStarted && typedText.length > 0) {
        startTimer();
    }

    updateCharacterStates();
    updateProgress();
    updateLiveStatistics();

    /*
     * Finish early if the complete target has been typed.
     */
    if (
        typedText.length >= targetText.length &&
        typedText === targetText
    ) {
        finishTest();
    }
}


/* =========================================================
   CHARACTER STATES
   ========================================================= */

function updateCharacterStates() {
    const spans = textDisplay.querySelectorAll("span");

    const typedText = typingInput.value;

    spans.forEach((span, index) => {
        span.classList.remove(
            "correct",
            "incorrect",
            "current"
        );

        if (index < typedText.length) {
            if (
                typedText[index] ===
                targetText[index]
            ) {
                span.classList.add("correct");
            } else {
                span.classList.add("incorrect");
            }

            return;
        }

        if (index === typedText.length) {
            span.classList.add("current");
        }
    });
}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {
    if (!targetText.length) {
        return;
    }

    const typedLength = Math.min(
        typingInput.value.length,
        targetText.length
    );

    const percentage = Math.min(
        100,
        Math.round(
            (typedLength / targetText.length) * 100
        )
    );

    if (progressElement) {
        progressElement.textContent =
            `${percentage}%`;
    }

    if (progressFillElement) {
        progressFillElement.style.width =
            `${percentage}%`;
    }
}


/* =========================================================
   LIVE STATISTICS
   ========================================================= */

function calculateCharacterStatistics() {
    const typedText = typingInput.value;

    let correctCharacters = 0;
    let incorrectCharacters = 0;

    const comparisonLength = Math.min(
        typedText.length,
        targetText.length
    );

    for (
        let index = 0;
        index < comparisonLength;
        index++
    ) {
        if (
            typedText[index] ===
            targetText[index]
        ) {
            correctCharacters++;
        } else {
            incorrectCharacters++;
        }
    }

    if (typedText.length > targetText.length) {
        incorrectCharacters +=
            typedText.length - targetText.length;
    }

    return {
        correctCharacters,
        incorrectCharacters
    };
}


function calculateWPM(
    correctCharacters,
    seconds
) {
    if (seconds <= 0) {
        return 0;
    }

    const minutes = seconds / 60;

    return Math.round(
        (correctCharacters / 5) / minutes
    );
}


function calculateAccuracy(
    correctCharacters,
    typedCharacters
) {
    if (typedCharacters <= 0) {
        return 100;
    }

    return Math.round(
        (correctCharacters / typedCharacters) * 100
    );
}


function updateLiveStatistics() {
    const statistics =
        calculateCharacterStatistics();

    const typedCharacters =
        typingInput.value.length;

    const currentSeconds =
        testStarted
            ? Math.max(
                0.01,
                elapsedSeconds
            )
            : 0;

    const wpm =
        calculateWPM(
            statistics.correctCharacters,
            currentSeconds
        );

    const accuracy =
        calculateAccuracy(
            statistics.correctCharacters,
            typedCharacters
        );

    if (wpmElement) {
        wpmElement.textContent = wpm;
    }

    if (accuracyElement) {
        accuracyElement.textContent = accuracy;
    }

    if (errorsElement) {
        errorsElement.textContent =
            statistics.incorrectCharacters;
    }
}


/* =========================================================
   WORD STATISTICS
   ========================================================= */

function getTargetWords() {
    return targetText
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}


function getTypedWords() {
    return typingInput.value
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}


function calculateWordStatistics() {
    const targetWords = getTargetWords();

    const typedWords = getTypedWords();

    let correctWords = 0;
    let mistypedWords = 0;

    /*
     * A word is considered completed when:
     * 1. It is followed by a space, or
     * 2. The user has typed the complete target text.
     */
    const rawTypedText = typingInput.value;

    const completedWordCount =
        rawTypedText.endsWith(" ")
            ? typedWords.length
            : (
                rawTypedText.length >=
                targetText.length
                    ? typedWords.length
                    : Math.max(
                        0,
                        typedWords.length - 1
                    )
            );

    for (
        let index = 0;
        index < completedWordCount;
        index++
    ) {
        if (
            index >= targetWords.length
        ) {
            mistypedWords++;
            continue;
        }

        if (
            typedWords[index] ===
            targetWords[index]
        ) {
            correctWords++;
        } else {
            mistypedWords++;
        }
    }

    const totalWords = targetWords.length;

    const untouchedWords = Math.max(
        0,
        totalWords -
        correctWords -
        mistypedWords
    );

    return {
        correctWords,
        mistypedWords,
        untouchedWords,
        totalWords
    };
}


/* =========================================================
   FINISH TEST
   ========================================================= */

function finishTest() {
    if (testFinished) {
        return;
    }

    testFinished = true;

    stopTimer();

    /*
     * The standard test is measured over 60 seconds.
     */
    elapsedSeconds = TEST_DURATION;

    updateTimerDisplay(0);

    const characterStats =
        calculateCharacterStatistics();

    const typedCharacters =
        typingInput.value.length;

    const finalWpm =
        calculateWPM(
            characterStats.correctCharacters,
            TEST_DURATION
        );

    const finalAccuracy =
        calculateAccuracy(
            characterStats.correctCharacters,
            typedCharacters
        );

    const wordStats =
        calculateWordStatistics();

    if (wpmElement) {
        wpmElement.textContent =
            finalWpm;
    }

    if (accuracyElement) {
        accuracyElement.textContent =
            finalAccuracy;
    }

    if (errorsElement) {
        errorsElement.textContent =
            characterStats.incorrectCharacters;
    }

    if (finalWpmElement) {
        finalWpmElement.textContent =
            finalWpm;
    }

    if (finalAccuracyElement) {
        finalAccuracyElement.textContent =
            `${finalAccuracy}%`;
    }

    if (finalErrorsElement) {
        finalErrorsElement.textContent =
            characterStats.incorrectCharacters;
    }

    if (correctWordsElement) {
        correctWordsElement.textContent =
            wordStats.correctWords;
    }

    if (mistypedWordsElement) {
        mistypedWordsElement.textContent =
            wordStats.mistypedWords;
    }

    if (untouchedWordsElement) {
        untouchedWordsElement.textContent =
            wordStats.untouchedWords;
    }

    if (totalWordsElement) {
        totalWordsElement.textContent =
            wordStats.totalWords;
    }

    updateProgress();

    typingInput.disabled = true;

    setStatus(
        "Complete",
        "status-complete"
    );

    resultCard.classList.remove("hidden");

    requestAnimationFrame(() => {
        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* =========================================================
   PASTE / COPY / CUT PROTECTION
   ========================================================= */

function setupTypingProtection() {

    typingInput.addEventListener(
        "paste",
        preventTypingShortcut
    );

    typingInput.addEventListener(
        "copy",
        preventTypingShortcut
    );

    typingInput.addEventListener(
        "cut",
        preventTypingShortcut
    );

    typingInput.addEventListener(
        "contextmenu",
        preventTypingShortcut
    );

    typingInput.addEventListener(
        "drop",
        preventTypingShortcut
    );

    typingInput.addEventListener(
        "dragover",
        preventTypingShortcut
    );

    typingInput.addEventListener(
        "beforeinput",
        handleBeforeInput
    );

    typingInput.addEventListener(
        "keydown",
        handleTypingKeydown
    );
}


function preventTypingShortcut(event) {
    event.preventDefault();
}


function handleBeforeInput(event) {
    const inputType = event.inputType || "";

    if (
        inputType === "insertFromPaste" ||
        inputType === "insertFromDrop" ||
        inputType === "insertFromYank"
    ) {
        event.preventDefault();
    }
}


function handleTypingKeydown(event) {

    const modifierPressed =
        event.ctrlKey ||
        event.metaKey;

    if (!modifierPressed) {
        return;
    }

    const key =
        event.key.toLowerCase();

    if (
        key === "v" ||
        key === "c" ||
        key === "x"
    ) {
        event.preventDefault();
    }
}


/* =========================================================
   MODAL SYSTEM
   ========================================================= */

function setupModalSystem() {

    const modalOpenButtons =
        document.querySelectorAll(
            "[data-modal]"
        );

    const modalCloseElements =
        document.querySelectorAll(
            "[data-close-modal]"
        );

    modalOpenButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const modalId =
                    button.getAttribute(
                        "data-modal"
                    );

                openModal(modalId);
            }
        );
    });

    modalCloseElements.forEach((element) => {
        element.addEventListener(
            "click",
            () => {
                const modal =
                    element.closest(".modal");

                if (modal) {
                    closeModal(modal.id);
                }
            }
        );
    });

    document.addEventListener(
        "keydown",
        handleModalKeyboard
    );
}


function openModal(modalId) {
    const modal =
        document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    const closeButton =
        modal.querySelector(".modal-close");

    if (closeButton) {
        requestAnimationFrame(() => {
            closeButton.focus();
        });
    }
}


function closeModal(modalId) {
    const modal =
        document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    const openModalExists =
        document.querySelector(
            '.modal[aria-hidden="false"]'
        );

    if (!openModalExists) {
        document.body.style.overflow = "";
    }
}


function handleModalKeyboard(event) {
    if (event.key !== "Escape") {
        return;
    }

    const activeModal =
        document.querySelector(
            '.modal[aria-hidden="false"]'
        );

    if (activeModal) {
        closeModal(activeModal.id);
    }
}


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden ||
            !testStarted ||
            testFinished
        ) {
            return;
        }

        /*
         * The timer uses performance.now(),
         * so returning to the page keeps the
         * elapsed time accurate.
         */
        updateTimer();
    }
);


/* =========================================================
   CLEANUP
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {
        stopTimer();
    }
);