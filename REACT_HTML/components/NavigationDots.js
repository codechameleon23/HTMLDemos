const NavigationDots = ({ ...rest }) => {
   const { Link } = ReactRouterDOM;
   return (
   <Link
     className="pos-absolute pin-t pin-l flex-col border-2 border-transparent hover:border-primary rounded-4 hover:shadow-lg transition-all"
     {...rest}
   >
     <div className="pos-absolute bg-primary h-full w-full opacity-0 hover:opacity-25"></div>
     <div className="icon-20 ratio-1x1 pin-tl-50 pin-tl50 z-0 mt-24 pointer-events-none">
       <span className="pos-absolute pin rounded-full bg-error ping"></span>
       <span className="pos-absolute pin rounded-full bg-error"></span>
     </div>
   </Link>
 )};
