const Education = () => {
  return (
    <div class="education standard-block">
      <div class="education-school-info">
        <h1>Education</h1>
        <h2>St. Marcellinus Catholic Secondary School</h2>
        <h3>Mississauga, Ontario</h3>
        <div class="education-details">
          <p>Grade 12</p>
          <p class="grid-inverse">2023-2027</p>
          <p>OSSD</p>
          <p class="grid-inverse">Expected 2027</p>
        </div>
      </div>
      <div class="education-course-info">
        <h2>Courses</h2>
        <p>
          <span>Functions:</span>&nbsp;<b>96%</b>
        </p>
        <div class="education-course-info-bar">
          <div style={{ width: "96%" }} />
        </div>
        <p>
          <span>Physics:</span>&nbsp; <b>94%</b>
        </p>
        <div class="education-course-info-bar">
          <div style={{ width: "94%" }} />
        </div>
        <p>
          <span>Chemistry:</span>&nbsp; <b>96%</b>
        </p>
        <div class="education-course-info-bar">
          <div style={{ width: "96%" }} />
        </div>
        <p>
          <span>English:</span>&nbsp; <b>90%</b>
        </p>
        <div class="education-course-info-bar">
          <div style={{ width: "90%" }} />
        </div>
      </div>
      <div class="education-course-achievements">
        <h2>Achievements</h2>
        <p>Grade 8 Gauss Contest - 1st Place Schoolwide</p>
        <p>Grade 9 Pascal Contest - 1st Place Schoolwide, Distinction</p>
        <p>Grade 10 Cayley Contest - 1st Place Schoolwide, Distinction</p>
        <p>Chess Club - Junior Most Spirited 2025</p>
        <p>Pi Club - Junior Most Valuable 2025</p>
      </div>
    </div>
  );
};

export default Education;
