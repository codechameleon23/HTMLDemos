(function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
l.src='https://surfly.com/surfly.js';y.parentNode.insertBefore(l,y);})
(window,document,'script','Surfly');

var settings = {
// Surfly session options can be set here, or at the Company/Plan levels.
widget_key:'cd6401cf5fc745abbf232105998e1154',
};

Surfly.init(settings, function(initResult) {
    if (initResult.success) {
        // API calls can now be made!
        if (!Surfly.isInsideSession) {
            Surfly.button();
        }
    }
    else{
        console.log("Surfly was unable to initialize properly.")
    }
});