//1.5 Project Page Specfic Touch Styles ========================================
    //Nav Links
        //get ALL elements that need touch styles.
const articleLinks = document.querySelectorAll(".project-page-nav-link");
// const articleLinksMarker = document.querySelectorAll(".project-page-articleNav-marker");

        //Add touch styles on to them: on touch, touch stop, touch cancel.
articleLinks.forEach((linkElement) =>{

    linkElement.addEventListener("touchstart", addTouchStyle);
    linkElement.addEventListener("touchend", removeTouchStyle);
    linkElement.addEventListener("touchcancel", removeTouchStyle);
    
    function addTouchStyle(e){
        //add to parent element
        e.target.parentElement.classList.add("js-project-page-nav-link-text");
        //add to first child of parent element.
        e.target.parentElement.firstElementChild.classList.add("js-project-page-nav-link-marker")
    }
    function removeTouchStyle(e){
        //add to parent element
        e.target.parentElement.classList.remove("js-project-page-nav-link-text");
        //add to first child of parent element.
        e.target.parentElement.firstElementChild.classList.remove("js-project-page-nav-link-marker")
    }
});
    //Accordion Elements
const AccordionHeaders = document.querySelectorAll(".accordion-header");

AccordionHeaders.forEach((AccordionHeader) =>{
    AccordionHeader.addEventListener("touchstart", addTouchStyle);
    AccordionHeader.addEventListener("touchend", removeTouchStyle);
    AccordionHeader.addEventListener("touchcancel", removeTouchStyle);

    function addTouchStyle(e){
        e.target.parentElement.classList.add("js-accordion-checkbox-label");
    }
    function removeTouchStyle(e){
        e.target.parentElement.classList.remove("js-accordion-checkbox-label");
    }
});

//1.6 Article Section Scrolling Behaviour:

const ArticleNav_ScrollBar = document.querySelector(".scroll-progress-wrapper");
window.onscroll = ArticleNavScrollProgress;

const ArticleSection = document.querySelector(".project-page-article");

const resizeObserver = new ResizeObserver((entries) => {
    //fires anytime ArticleSection is resized! MAY WANT TO ADD DELAY BETWEEN UPDATES?
    ArticleNavScrollProgress();
});
resizeObserver.observe(ArticleSection);

let resizeTimeOutID; //ensures that resize function does not run on EACH resize, but whenever the user stops resizing (for at least for a few ms).
window.onresize = () => {
    //Fires anytime the window is resized! MAY WANT TO ADD DELAY BETWEEN UPDATES?
    ArticleNavScrollProgress();

    // clearTimeout(resizeTimeOutID);
    // resizeTimeOutID = setTimeout(() => {
    //     console.log("Window resize!");

    //     ArticleNavScrollProgress();
    // }, 200);
};


const articleNav = document.querySelector(".project-page-nav");


function ArticleNavScrollProgress(){
    //on scroll.
    //on window resize.
    //on page size increase (e.g., when accordion grows).

    //Only want to do this if NavBar is visible in the first place (may not be due to a media query for widths that are too low)
    if (window.getComputedStyle(articleNav).display === "none"){
        // console.log("Returning");
        return;
    }

    // console.log("Not returning lol");

    //
    let totalScrollBarHeight = document.body.scrollHeight - window.innerHeight;

    let progressHeight = (window.scrollY / totalScrollBarHeight) * 100;

    ArticleNav_ScrollBar.style.height = progressHeight + "%";
}


// 1.9: Accordion Checkbox Behaviour (want to be able to check or uncheck accordion collapse/espansion with Enter key)
//Update: Also want to change a variable in CSS to allow for correct accordion max-height transition.

const AccordionCheckboxs = document.querySelectorAll(".accordion-checkbox");

AccordionCheckboxs.forEach((AccordionCheckbox) =>{

    //Allow enter key to check and uncheck accordion:
    AccordionCheckbox.onkeypress = (e) => {
        if(e.key === "Enter"){ //CHECKBOX.
            AccordionCheckbox.checked = !AccordionCheckbox.checked;
        }
    };

    //get all text elements for the current accordion:
    const textElements = AccordionCheckbox.parentElement.querySelectorAll(".accordion-text-wrapper");

    //For those which are already checked, fit-content should be the max-height.
    if(AccordionCheckbox.checked){
        textElements.forEach((textElement) => {
            textElement.style.maxHeight = "fit-content";
            // textElement.style.maxHeight = "calc(" + textElement.scrollHeight + "px + 1ch";
        });
    }
    else{
        textElements.forEach((textElement) => {
            textElement.style.maxHeight = "0px";
        });
    }

    textElements.forEach((textElement) => {
        textElement.addEventListener("transitionend", e =>{
            if (AccordionCheckbox.checked){
                if (e.propertyName === "max-height"){
                    //above conditions check if the expand transition has ended.
                    // console.log("propertyName: ", e.propertyName);
                    textElement.style.maxHeight = "fit-content";    //if it has, make it fit-content.
                    //Reason: Want to make max-height fit content because it has text wrapping and may grow past the height + 2ch that it transitions to when expanded.
                }
            }
        })
    });


    //Transition to correct Max-height number.
    AccordionCheckbox.addEventListener('change', () => {
        if(AccordionCheckbox.checked){ //when expanding
            textElements.forEach((textElement) => {
                //Transition into height + 2ch.
                textElement.style.maxHeight = "calc(" + textElement.scrollHeight + "px + 2ch";
            });
        }
        else{                           //when collapsing
            textElements.forEach((textElement) => {
                //Will not craete a transition animation if animating from fit-content,
                //so must make it another value FIRST....

                textElement.style.maxHeight = "calc(" + textElement.scrollHeight + "px + 2ch";

                //then wait an arbitrary amount before starting the collapse transition.
                textElement.setAttribute("TimeoutID", setTimeout(() => {
                    textElement.style.maxHeight = "0px";
                }, 50)); //May want to make it greater than this but not too great that there seems like there is a delay.
            });
        }
    })
});

// //1.5 Article Section Scrolling Behaviour:

// //Get All Article Section Links
// const articleLinks = document.querySelectorAll(".project-page-nav-link");
// //For each link, create a listener for each click... 
// articleLinks.forEach((articleLink)=>{
//     const AssociatedSectionID =  articleLink.getAttribute("href").substring(1)//get ID of section we want to scroll down to on click.
//         //substring(1) removes the '#' in the beginning of the href attribute, allowing getElementById to work.
    
//     articleLink.dataset.AssociatedSectionID = AssociatedSectionID; //insert data for associatedSectionID so that on each click, can get its top boundingRect value

//     articleLink.removeAttribute("href");  //now wont scroll to about me section anymore as it normally would.

//     articleLink.addEventListener("click", e => {
//                 //Get ID from element's data set.
//         const AssociatedSection = document.getElementById(e.target.dataset.AssociatedSectionID); 
//                 //Get ID element from ID, then get it boundClientRect Top value.
//         const topOfAssociatedSection = AssociatedSection.getBoundingClientRect().top;

//                 //Get NavBar height
//         const navbarElement = document.querySelector('.navbar');
//         const navbarHeight = navbarElement.offsetHeight;

//               //Scroll to top of Associated Section, subtracting NavBar height. 
//         window.scrollBy(window.scrollX, topOfAssociatedSection - navbarHeight); //scroll to top of about_me element minus navbarHeight.
//     });


//     //Section For Intersection observor: 
//         //want to add in ID's for Nav Link Elements ON TO the dataset of their corresponing setion elements.
    
//     const NavLinkID = articleLink.getAttribute("id");
//     const AssociatedSection = document.getElementById(AssociatedSectionID); 
//     AssociatedSection.dataset.AssociatedLinkID = NavLinkID;
// });
// //1.9 Intersection observors for Article Section Link Highlighting... on scroll.

// const ScrollSections = document.querySelectorAll(".Scroll_to");

// const firstSection = ScrollSections[0];
// const lastSection = ScrollSections[ScrollSections.length-1];

// // console.log(ScrollSections)
// const observorElement = document.querySelector(".observor");

// const observor = new IntersectionObserver(function(sections, observor) {
//     //Sections = only the ones that just exited or entered the observing area.

//     sections.forEach(section => {
//         // console.log("Section Check: ", section.target.firstElementChild.id);
//         if (section.isIntersecting){
//             // console.log("Intersecting: ", section.target.firstElementChild.id);
//             addNavLinkStyles(section.target);
//         }
//         else{
//             // console.log("NOT Intersecting: ", section.target.firstElementChild.id);
//             removeNavLinkStyles(section.target);
//         }
//     })

//     function addNavLinkStyles(section){
//         const AssociatedNavLinkElement = document.getElementById(section.firstElementChild.dataset.AssociatedLinkID); 
//         AssociatedNavLinkElement.parentElement.classList.add("js-project-page-nav-link-text")
//         AssociatedNavLinkElement.parentElement.firstElementChild.classList.add("js-project-page-nav-link-marker")
//     }
//     function removeNavLinkStyles(section){
//         const AssociatedNavLinkElement = document.getElementById(section.firstElementChild.dataset.AssociatedLinkID); 
//         AssociatedNavLinkElement.parentElement.classList.remove("js-project-page-nav-link-text")
//         AssociatedNavLinkElement.parentElement.firstElementChild.classList.remove("js-project-page-nav-link-marker")
//     }
// }, {
//     threshold: 0.85, //ensures the callback function only runs IF x percent of an observed entry is showing (0-1 limit)
//     //root: observorElement //sets observor to observe a specific container (e.g., a scroll container) instead of entire page

    
//     rootMargin: getNavBarHeightinPX() //only observe section of screen below navbar.
//     //rootMargin: "-50% 0% -50% 0px" //observors page x pixels inwards from top and bottom.
// })      //made so only 2% of the screen (in the middle) is checking intesections!
//         //Can messa round with the margins to make it go anywhere.


// function getNavBarHeightinPX(subtract = "-", offset = 1){
//     let navbarHeight = "";

//     if (subtract === "-"){
//         navbarHeight = "-"
//     }

//     navbarHeight += document.querySelector('.navbar').offsetHeight - offset;

//     navbarHeight += "px";

//     // console.log("navbar height: ", navbarHeight);

//     return navbarHeight;
// }

// // ScrollSections.forEach((Section)=>{
// //     observor.observe(Section);
// // })



// General Touch Style adder:
    // Can use: 
        // AddTouchForMultipleEl(document.querySelectorAll(".class_name"), "JS-Touch")
        // AddTouchStyle(document.querySelector(".class_name"), "JS-Touch")
        // addClickStyle(document.querySelector(".class_name"), "JS-Touch") //toggles style

// if ((window.matchMedia( "(hover: none)" ).matches) || onSamsungChrome()) {}

const full_screen_button = document.getElementById("fullscreen_btn");
if (full_screen_button != null){
    full_screen_button.addEventListener("touchstart", addTouchStyle);
    full_screen_button.addEventListener("touchend", removeTouchStyle);
    full_screen_button.addEventListener("touchcancel", removeTouchStyle);
    function addTouchStyle(e){
        e.target.parentElement.classList.add("fullscreen_btn-touch");
    }
    function removeTouchStyle(e){
        e.target.parentElement.classList.remove("fullscreen_btn-touch");
    }
    //
    full_screen_button.onclick = () =>{
        let iframe = document.getElementById("iframe-demo");
        enterFullscreen(iframe);
    }
}
async function enterFullscreen(iframe){
    // iframe.requestFullscreen({navigationUI: "show"});

    // must await before landscape mode or will not set to landscape on some devices.
    iframe.requestFullscreen().then(_ => {
        // will throw error on devices without orientation.lock, so catch
        screen.orientation.lock("landscape").catch(err => {
            console.warn("could not set to landscape: ", err);
        })
    });
}
