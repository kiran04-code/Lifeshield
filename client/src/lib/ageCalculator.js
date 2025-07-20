const ageFinder = (dobString) => {
  const dob = new Date(dobString); // e.g. "2000-05-15"
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  let month = today.getMonth() -dob.getMonth()
  let day =dob.getDay() -today.getDay()
  return `YY:${age} `
};

export default ageFinder;
 const dob = new Date("2025-07-26"); // e.g. "2000-05-15"
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  let month = today.getMonth() -dob.getMonth()
  let day = today.getDay() -dob.getDay()
  console.log(day)