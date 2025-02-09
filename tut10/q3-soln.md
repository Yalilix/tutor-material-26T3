## Sample Answer
- a) Design Principle Violated: *DRY - Don't Repeat Yourself.*
  - Justification: *Repetition in `normalizeDay()` and `dayToMessage()` can be minimized through functions or refactoring e.g. checking both lowercase and capitalised days.*
- b) Refactored Code (one of many possible solutions)

```js
const DAY_OF_WEEK_TO_MSG = {
  "monday": "It's Monday!",
  "tuesday": "It's Tuesday! Exam DAY",
  "wednesday": "it's the middle of the work week!",
  "thursday": "Almost friday...",
  "friday": "Rebecca who?",
  "saturday": "yay weekend!",
  "sunday": "almost monday :(",
};

function normalizeDay(d) {
  const day = d.toLowerCase();

  if (Object.keys(DAY_OF_WEEK_TO_MSG).includes(day)) {
    return day;
  }
  return null;
}

function dayToMessage(d) {
  if (!DAY_OF_WEEK_TO_MSG[d]) {
    return null;
  }
  return DAY_OF_WEEK_TO_MSG[d];
}

function getMessageByDay(day) {
  const normalizedDay = normalizeDay(day);

  if (normalizedDay) {
    const message = dayToMessage(normalizedDay);
    console.log(message);
  } else {
    console.log("Invalid input. Exiting.");
  }
}

getMessageByDay('monday');
getMessageByDay('Thursday');
getMessageByDay('unknown');
```

## Marking Criteria
- 1 mark - correct design principle
- 1 mark - reasonable justification i.e. relates to context and makes sense
- 2 marks - refactored code removes duplication in both functions
