/*import Admin from "../ui/admin/main/admin";*/
import AdminNews from "../ui/admin/news/news";
import AdminNewsEdit from "../ui/admin/news/news-create-edit/news-create-edit";
import AdminCompetitions from "../ui/admin/comp/comp";
import AdminCompetitionsEdit from "../ui/admin/comp/comp-edit/comp-edit";
import AdminReferenceBooks from "../ui/admin/reference-books/reference-books";
import AdminReferenceBooksPools from "../ui/admin/reference-books/pool/pools";
import AdminReferenceBooksPoolsEdit from "../ui/admin/reference-books/pool/pools-edit";
import AdminJudgesOrders from '../ui/admin/judges-orders/judges-orders'
import AdminJudgesOrdersEdit from '../ui/admin/judges-orders/judges-orders-edit/judges-orders-edit'
import AdminReferenceBooksPeople from '../ui/admin/reference-books/people/people'
import AdminReferenceBooksPeopleEdit from '../ui/admin/reference-books/people/edit/people-edit'
import AdminAboutUs from '../ui/admin/about-us/about-us'


export const MenuTypes = {
    admin:'admin',
}

const PrefixPath = {
    admin: '/5070/admin',
}


const AdminRouterManager = {
    /*Main: {
        path: PrefixPath.admin,
        Component: Admin,
        getUrl() {return PrefixPath.admin},
        auth: true,
        header: {
            view: false
        },
    },*/
    News: {
        path: `${PrefixPath.admin}/news`,
        Component: AdminNews,
        getUrl() {return `${PrefixPath.admin}/news`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'Новости'
        }
    },
    News__Edit: {
        path: `${PrefixPath.admin}/news/:id`,
        Component: AdminNewsEdit,
        getUrl(id) {return `${PrefixPath.admin}/news/${id}`},
        auth: true,
        header: {
            view: false
        },
    },
    Competitions: {
        path:`${PrefixPath.admin}/competitions`,
        Component: AdminCompetitions,
        getUrl() {return `${PrefixPath.admin}/competitions`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'Соревнования'
        }
    },
    Competitions__Edit: {
        path: `${PrefixPath.admin}/competitions/:id`,
        Component: AdminCompetitionsEdit,
        getUrl(id) {return `${PrefixPath.admin}/competitions/${id}`},
        auth: true,
        header: {
            view: false
        },
    },
    Judges_Orders: {
        path:`${PrefixPath.admin}/judges-orders`,
        Component: AdminJudgesOrders,
        getUrl() {return `${PrefixPath.admin}/judges-orders`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'Судейский корпус'
        }
    },
    Judges_Orders_Edit: {
        path:`${PrefixPath.admin}/judges-orders/:id`,
        Component: AdminJudgesOrdersEdit,
        getUrl(id) {return `${PrefixPath.admin}/judges-orders/${id}`},
        auth: true,
        header: {
            view: false
        }
    },
    Reference__Books: {
        path:`${PrefixPath.admin}/reference-books`,
        Component: AdminReferenceBooks,
        getUrl() {return `${PrefixPath.admin}/reference-books`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'Справочники'
        }
    },
    Reference__Books__Pool: {
        path:`${PrefixPath.admin}/reference-books/pools`,
        Component: AdminReferenceBooksPools,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools`},
        auth: true,
        header: {
            view: false
        }
    },
    Reference__Books__Pool_Edit: {
        path:`${PrefixPath.admin}/reference-books/pools/edit/:id`,
        Component: AdminReferenceBooksPoolsEdit,
        getUrl(id) {return `${PrefixPath.admin}/reference-books/pools/edit/${id}`},
        auth: true,
        header: {
            view: false
        }
    },
    Reference__Books__People: {
        path:`${PrefixPath.admin}/reference-books/people`,
        Component: AdminReferenceBooksPeople,
        getUrl() {return `${PrefixPath.admin}/reference-books/people`},
        auth: true,
        header: {
            view: false
        }
    },
    Reference__Books__People_Edit: {
        path:`${PrefixPath.admin}/reference-books/people/edit/:id`,
        Component: AdminReferenceBooksPeopleEdit,
        getUrl(id) {return `${PrefixPath.admin}/reference-books/people/edit/${id}`},
        auth: true,
        header: {
            view: false
        }
    },
    AboutUs: {
        path:`${PrefixPath.admin}/about-us`,
        Component: AdminAboutUs,
        getUrl() {return `${PrefixPath.admin}/about-us`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'О нас'
        }
    },
}

export const ADM_RM = AdminRouterManager;
