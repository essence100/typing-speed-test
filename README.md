# Typing Speed Test

A clean, responsive, and lightweight web-based typing speed test designed to help users measure and improve their typing speed, accuracy, and consistency.

## Overview

**Typing Speed Test** is a browser-based typing practice and performance measurement tool built with pure HTML, CSS, and JavaScript.

The application provides a simple distraction-free environment where users can complete a **60-second typing test** and receive detailed performance results.

The project requires no backend, database, account, or external JavaScript framework.

## Features

* 60-second typing test
* Real-time countdown timer
* Words Per Minute (WPM) calculation
* Real-time typing accuracy
* Error tracking
* Correct word tracking
* Mistyped word tracking
* Untouched word tracking
* Total word count
* Real-time typing progress
* Visual character feedback
* Automatically generated readable English paragraphs
* New paragraph for each test
* Restart test functionality
* Detailed completion results
* Responsive design
* Mobile-friendly interface
* Keyboard-friendly controls
* Dark modern interface
* About Me section
* About Website section
* Privacy information
* Terms of Use
* Anti-paste protection
* Copy/cut protection
* Drag-and-drop text protection
* Context-menu protection
* Local browser-based processing
* No account registration required
* No payment system required
* No database required

## Performance Metrics

After completing a test, the application displays:

| Metric          | Description                                |
| --------------- | ------------------------------------------ |
| WPM             | Estimated words typed per minute           |
| Accuracy        | Percentage of correctly typed characters   |
| Errors          | Number of incorrect characters             |
| Correct Words   | Completed words matching the target        |
| Mistyped Words  | Completed words containing typing mistakes |
| Untouched Words | Words that were not typed                  |
| Total Words     | Total words available in the test          |

## How It Works

1. Open the website.
2. A typing paragraph is generated automatically.
3. Click inside the typing area.
4. Start typing the displayed paragraph.
5. The timer starts when typing begins.
6. Type as accurately as possible.
7. The test runs for 60 seconds.
8. When the test ends, your performance results are displayed.
9. Select **Try Again** or restart the test to practice again.

## Technology Stack

The project is intentionally lightweight and uses standard web technologies.

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Browser APIs

The application uses standard browser APIs such as:

* DOM API
* `performance.now()`
* `setInterval()`
* `local browser events`
* Visibility API

No frontend framework is required.

## Project Structure

```text
typing-speed-test/
│
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── typing-speed.png
└── README.md
```

### File Description

#### `index.html`

Contains the main application structure, including:

* Header
* Logo
* Statistics
* Typing test interface
* Progress indicator
* Result section
* About modal
* Privacy modal
* Terms modal
* Footer
* SEO metadata
* Open Graph metadata
* Structured data

#### `style.css`

Contains the complete visual design and responsive layout.

It handles:

* Dark theme
* Cards
* Buttons
* Typography
* Statistics
* Typing area
* Character states
* Progress bar
* Result cards
* Modals
* Footer
* Mobile layouts
* Accessibility states
* Print styles

#### `script.js`

Contains the application's functionality, including:

* Test generation
* Timer
* WPM calculation
* Accuracy calculation
* Error calculation
* Word statistics
* Character comparison
* Progress tracking
* Test restart
* Completion handling
* Modal controls
* Anti-paste behavior

#### `typing-speed.png`

The main website logo displayed in the application header.

#### `robots.txt`

Provides crawler instructions for search engines.

#### `sitemap.xml`

Provides the website URL structure to search engines.

## Responsive Design

The interface is designed to work across different screen sizes, including:

* Desktop computers
* Laptops
* Tablets
* Mobile phones

The layout automatically adapts to smaller screens while maintaining readable typography and usable controls.

## Anti-Paste Protection

The typing test intentionally prevents users from inserting text through common clipboard and drag-and-drop actions.

The application blocks:

* Paste
* Copy
* Cut
* Drag-and-drop text insertion
* Common clipboard keyboard shortcuts
* Context-menu based text insertion

This helps keep the test focused on actual typing practice.

> Anti-paste protection is a user-experience feature rather than a security boundary. Browser-based JavaScript cannot guarantee protection against every possible form of automation or manipulation.

## Privacy

The application does not require users to create an account.

The typing test does not require:

* Passwords
* Payment information
* Personal accounts
* Database records

Typing information is processed within the browser for calculating the test results.

Users should avoid entering sensitive or confidential information into the typing test.

## SEO

The website includes basic search-engine optimization features such as:

* Descriptive page title
* Meta description
* Canonical URL
* Open Graph metadata
* Structured data
* `robots.txt`
* `sitemap.xml`

The final production domain should replace the placeholder:

```text
YOUR-DOMAIN-HERE
```

in the appropriate SEO files before final deployment.

## Accessibility

The interface includes accessibility-focused features such as:

* Semantic HTML
* Form labels and descriptions
* Keyboard-friendly controls
* Visible focus states
* ARIA attributes where appropriate
* Reduced-motion support
* Responsive text sizing
* Clear visual feedback

## Security Considerations

The application is designed as a static frontend and does not contain:

* Server-side credentials
* API secrets
* Database passwords
* Authentication tokens
* Payment credentials

The application does not use:

* `eval()`
* dynamically executed user code
* unsafe external script dependencies

Target text is rendered using safe DOM APIs rather than injecting arbitrary HTML.

For production deployment, HTTPS should be enabled by the hosting provider.

## Browser Support

The website is intended for modern browsers that support standard HTML5, CSS3, and JavaScript features.

Recommended browsers include:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

## Local Development

Clone the repository:

```bash
git clone https://github.com/essence100/typing-speed-test.git
```

Move into the project directory:

```bash
cd typing-speed-test
```

Because this is a static website, no package installation or backend server is required.

You can open:

```text
index.html
```

directly in a modern browser.

For a local development server, any standard static web server can be used.

## Deployment

The project can be deployed using static hosting services such as:

* GitHub Pages
* Netlify
* Vercel
* Cloudflare Pages
* Any standard static web hosting provider

### GitHub Pages

The repository is available at:

https://github.com/essence100/typing-speed-test

The project can be deployed directly from the `main` branch using GitHub Pages.

## Future Improvements

Possible future improvements include:

* Multiple test durations
* Custom typing passages
* Difficulty levels
* Personal typing history
* Best WPM tracking
* Daily typing challenges
* More detailed performance analytics
* Keyboard heatmap
* Additional languages
* Optional user accounts
* Optional cloud-based statistics
* Leaderboards

Any future account, analytics, advertising, or cloud-storage features should be accompanied by appropriate privacy and security updates.

## Author

**BENEDICT E. CHARLES**

Web Developer • IT Specialist

Skills and technologies include:

* HTML
* CSS
* JavaScript
* Python
* React
* UI/UX
* Modern Web Technologies

## Purpose

Typing Speed Test was created as a practical tool for students, college and university learners, professionals, developers, and anyone who wants to practice typing speed and accuracy.

The goal is simple:

**Practice. Type. Improve.**

## License

This project currently does not specify a separate open-source license.

All rights and usage permissions remain with the project owner unless a license is added to the repository.

---

© 2026 **BENEDICT E. CHARLES**

Created for better typing practice.
