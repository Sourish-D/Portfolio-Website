const Education = () => {
  return (
    <section className="education standard-block middle-box even-flex space-up">
      <div className="right-border distribute-column-text">
        <h1 className="important-text">Education</h1>
        <div className="education-details double-grid special">
          <p>Grade 12</p>
          <p className="grid-inverse">2023-2027</p>
          <p>OSSD</p>
          <p className="grid-inverse">Expected 2027</p>
        </div>
      </div>
      <div className="education-course-info right-border distribute-column-text">
        <h2 className="important-text">Courses</h2>
        <p>
          <span>Functions:</span>&nbsp;<b>96%</b>
        </p>
        <div className="education-course-info-bar">
          <div style={{ width: "96%" }} />
        </div>
        <p>
          <span>Physics:</span>&nbsp; <b>94%</b>
        </p>
        <div className="education-course-info-bar">
          <div style={{ width: "94%" }} />
        </div>
        <p>
          <span>Chemistry:</span>&nbsp; <b>96%</b>
        </p>
        <div className="education-course-info-bar">
          <div style={{ width: "96%" }} />
        </div>
        <p>
          <span>English:</span>&nbsp; <b>90%</b>
        </p>
        <div className="education-course-info-bar">
          <div style={{ width: "90%" }} />
        </div>
      </div>
      <div className="education-course-achievements distribute-column-text">
        <h2 className="important-text">Achievements</h2>
        <p>Grade 8 Gauss Contest - 1st Place Schoolwide</p>
        <p>Grade 9 Pascal Contest - 1st Place Schoolwide, Distinction</p>
        <p>Grade 10 Cayley Contest - 1st Place Schoolwide, Distinction</p>
        <p>Chess Club - Junior Most Spirited 2025</p>
        <p>Pi Club - Junior Most Valuable 2025</p>
      </div>
    </section>
  );
};

export default Education;
