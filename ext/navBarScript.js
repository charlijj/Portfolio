//~=>@JJWEB<=~
// * /  .\   *
// * /  =__| * 
// * /    || *
// * * * * * *

function navBarChange () {

    const nav = document.getElementById(`navBar`);
    nav.style.opacity = `0.5`;
    nav.style.height = `20px`;

    setTimeout(() => {
        
        nav.style.opacity = `1`; 
        nav.style.height = `40px`;        

    }, 800);

}