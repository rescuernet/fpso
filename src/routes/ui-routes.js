import Competitions from "../ui/client/comp/comp";
import CompetitionsView from "../ui/client/comp/comp-view/comp-view";
import LoginForm from "../ui/client/login/login-form";
import Main from "../ui/client/main/main";
import News from "../ui/client/news/news";
import NewsView from "../ui/client/news/news-view/news-view";
import Rusada from "../ui/client/rusada/rusada";
import JudgesOrders from "../ui/client/judges-orders/judges-orders";
import AboutUs from "../ui/client/about-us/about-us";


export const MenuTypes = {
    main: 'main'
}

const PrefixPath = {
    login: '/5070/login'
}

const UIRouterManager = {
    Main: {
        path:'/',
        Component: Main,
        getUrl() {return `/`},
        auth: false,
        header: {
            view: true,
            title: 'Главная'
        }
    },
    News: {
        path:'/news',
        Component: News,
        getUrl() {return `/news`},
        auth: false,
        header: {
            view: true,
            title: 'Новости'
        },
        menu: {
            type: MenuTypes.main,
            title: 'Новости'
        }
    },
    News__Page: {
        path:'/news/:page',
        Component: News,
        getUrl(page) {return `/news/${page}`},
        auth: false,
        header: {
            view: true,
            title: 'Новости'
        },
    },
    News__Id: {
        path:'/news/view/:id',
        Component: NewsView,
        getUrl(id) {return `/news/view/${id}`},
        auth: false,
        header: {
            view: true,
            title: 'Новости'
        }
    },
    Competitions: {
        path:'/competitions',
        Component: Competitions,
        getUrl() {return `/competitions`},
        auth: false,
        header: {
            view: true,
            title: 'Соревнования'
        },
        menu: {
            type: MenuTypes.main,
            title: 'Соревнования'
        }
    },
    Competitions__Page: {
        path:'/competitions/:page',
        Component: Competitions,
        getUrl(page) {return `/competitions/${page}`},
        auth: false,
        header: {
            view: true,
            title: 'Соревнования'
        }
    },
    Competitions__Id: {
        path:'/competitions/view/:id',
        Component: CompetitionsView,
        getUrl(id) {return `/competitions/view/${id}`},
        auth: false,
        header: {
            view: true,
            title: 'Соревнования'
        }
    },
    JudgesOrders: {
        path:'/judges-orders',
        Component: JudgesOrders,
        getUrl() {return `/judges-orders`},
        auth: false,
        header: {
            view: true,
            title: 'Судейский корпус'
        },
        menu: {
            type: MenuTypes.main,
            title: 'Судейский корпус'
        }
    },
    Rusada: {
        path:'/rusada',
        Component: Rusada,
        getUrl() {return `/rusada`},
        auth: false,
        header: {
            view: true,
            title: 'Антидопинг'
        },
        menu: {
            type: MenuTypes.main,
            title: 'Антидопинг'
        }
    },
    AboutUs: {
        path:'/about-us',
        Component: AboutUs,
        getUrl() {return `/about-us`},
        auth: false,
        header: {
            view: true,
            title: 'О нас'
        },
        menu: {
            type: MenuTypes.main,
            title: 'О нас'
        }
    },
    Login: {
        path: PrefixPath.login,
        Component: LoginForm,
        getUrl() {return PrefixPath.login},
        auth: false,
        header: {
            view: true,
            title: 'Авторизация'
        }
    }
}

export const UI_RM = UIRouterManager;
