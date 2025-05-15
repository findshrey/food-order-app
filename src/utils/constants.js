const ROUTES = {
   auth: "/auth",
   cancel: "/cancel",
   cart: "/cart",
   contact: "/contact-us",
   offers: "/offers",
   home: "/",
   menu: "/menu",
   profile: "/profile",
   success: "/success",
}

const NAV_LINKS = [
   {
      name: "Home",
      url: ROUTES.home,
   },
   {
      name: "Menu",
      url: ROUTES.menu,
   },
   {
      name: "Offers",
      url: ROUTES.offers,
   },
   {
      name: "Contact",
      url: ROUTES.contact,
   },
]

const FORM_MODES = {
   login: "login",
   signUp: "sign-up",
}

export { ROUTES, NAV_LINKS, FORM_MODES }
