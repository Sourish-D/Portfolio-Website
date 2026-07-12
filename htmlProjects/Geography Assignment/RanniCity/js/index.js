const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className='NavDown';
    } else {
      entry.target.className='';
    }
  });
});


const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className+=' RightToLeft';
    }
  });
});


const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className+=' UpToDown';
    }
  });
});

//Commercial Tab
function OpenModal(link) {
  document.getElementById("CommercialModal").style.display="block";
  document.getElementById("CommercialModalImg").src=link;
  document.getElementById("CommercialModal").className="Modal ModalView"
}
function CloseModal() {
  document.getElementById("CommercialModal").style.display="none";
  document.getElementById("CommercialModal").className="Modal"
}
//IMPORTANT PUT AT END !!!!!
const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className+=' LeftToRightNoOpac';
    }
  });
});
const observer4 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className+=' RightToLeftNoOpac';
    }
  });
});
const observer5 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className+=' tableAnimation';
    }
  });
});
const observer6 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.className+=' garbageAnimation';
    }
  });
});
const Anouncements = document.getElementsByClassName("Announcement");
const Tables = document.getElementsByClassName("garbage_td");

observer.observe(document.getElementById("NavBar"));
if ( document.URL.includes("index.html") ) {
  observer1.observe(document.getElementById("hero_image_text"));
  observer1.observe(document.getElementById("PresentationTitle"));
  observer2.observe(document.getElementById("Presentation"));
  for (item in Anouncements) {
    if (item%2==0) {
      observer3.observe(Anouncements[item]);
    } else {
      observer4.observe(Anouncements[item]);
    }
  }
}
if ( document.URL.includes("services.html") ) {
  observer4.observe(document.getElementsByClassName("service")[0]);
  observer3.observe(document.getElementsByClassName("service")[1]);
  observer4.observe(document.getElementsByClassName("service")[2]);
  observer6.observe(document.getElementById("garbage_image"));
  for (item in Tables) {
    observer5.observe(Tables[item]);
  }
}
if ( document.URL.includes("people.html")) {
  for (item in document.getElementsByClassName("people_item")) {
    observer2.observe(document.getElementsByClassName("people_item")[item]);
  }
}