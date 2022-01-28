export const MenuTypes = {
    admin:'admin',
}

const PrefixPath = {
    admin: '/5070/admin',
}


const AdminAPIRouterManager = {
    mediaDelTmp: {
        path: `${PrefixPath.admin}/mediadeltmp`,
        getUrl() {return `${PrefixPath.admin}/mediadeltmp`},
    },
    mediaDelTmpBlocking: {
        path: `${PrefixPath.admin}/mediadeltmpblocking`,
        getUrl() {return `${PrefixPath.admin}/mediadeltmpblocking`},
    },
    News__Create: {
        path: `${PrefixPath.admin}/news/create`,
        getUrl() {return `${PrefixPath.admin}/news/create`},
    },
    News__Update: {
        path: `${PrefixPath.admin}/news/update`,
        getUrl() {return `${PrefixPath.admin}/news/update`},
    },
    News__Avatar__Create: {
        path: `${PrefixPath.admin}/news/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/news/avatar-create`},
    },
    News__Image__Create: {
        path: `${PrefixPath.admin}/news/image-create`,
        getUrl() {return `${PrefixPath.admin}/news/image-create`},
    },
    News__Docs__Create: {
        path: `${PrefixPath.admin}/news/docs-create`,
        getUrl() {return `${PrefixPath.admin}/news/docs-create`},
    },
    News__Delete: {
        path: `${PrefixPath.admin}/news/delete`,
        getUrl() {return `${PrefixPath.admin}/news/delete`},
    },
    Competitions__Create: {
        path: `${PrefixPath.admin}/competitions/create`,
        getUrl() {return `${PrefixPath.admin}/competitions/create`},
    },
    Competitions__Update: {
        path: `${PrefixPath.admin}/competitions/update`,
        getUrl() {return `${PrefixPath.admin}/competitions/update`},
    },
    Competitions__Avatar__Create: {
        path: `${PrefixPath.admin}/competitions/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/competitions/avatar-create`},
    },
    Competitions__Docs__Create: {
        path: `${PrefixPath.admin}/competitions/docs-create`,
        getUrl() {return `${PrefixPath.admin}/competitions/docs-create`},
    },
    Competitions__Image__Create: {
        path: `${PrefixPath.admin}/competitions/image-create`,
        getUrl() {return `${PrefixPath.admin}/competitions/image-create`},
    },
    Competitions__Delete: {
        path: `${PrefixPath.admin}/competitions/delete`,
        getUrl() {return `${PrefixPath.admin}/competitions/delete`},
    },
    Judges_Orders__Create: {
        path:`${PrefixPath.admin}/judges-orders/create`,
        getUrl() {return `${PrefixPath.admin}/judges-orders/create`},
    },
    Judges_Orders__People__Get: {
        path:`${PrefixPath.admin}/judges-orders/people/get`,
        getUrl() {return `${PrefixPath.admin}/judges-orders/people/get`},
    },
    Judges_Orders__Docs__Create: {
        path: `${PrefixPath.admin}/judges-orders/docs-create`,
        getUrl() {return `${PrefixPath.admin}/judges-orders/docs-create`},
    },
    Judges_Orders__Save: {
        path:`${PrefixPath.admin}/judges-orders/save`,
        getUrl() {return `${PrefixPath.admin}/judges-orders/save`},
    },
    Reference__Books__Pools_Get: {
        path:`${PrefixPath.admin}/reference-books/pools/get`,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools/get`},
    },
    Reference__Books__Pools_Create: {
        path:`${PrefixPath.admin}/reference-books/pools/create`,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools/create`},
    },
    Reference__Books__Pools_Save: {
        path:`${PrefixPath.admin}/reference-books/pools/save`,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools/save`},
    },
    Reference__Books__People_Create: {
        path:`${PrefixPath.admin}/reference-books/people/create`,
        getUrl() {return `${PrefixPath.admin}/reference-books/people/create`},
    },
    Reference__Books__People_Avatar_Create: {
        path: `${PrefixPath.admin}/reference-books/people/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/reference-books/people/avatar-create`},
    },
    Reference__Books__People_Save: {
        path:`${PrefixPath.admin}/reference-books/people/save`,
        getUrl() {return `${PrefixPath.admin}/reference-books/people/save`},
    },
    Reference__Books__People_Get: {
        path:`${PrefixPath.admin}/reference-books/people/get`,
        getUrl() {return `${PrefixPath.admin}/reference-books/people/get`},
    },
    AboutUs__Docs__Create: {
        path: `${PrefixPath.admin}/about-us/docs-create`,
        getUrl() {return `${PrefixPath.admin}/about-us/docs-create`},
    },
    AboutUs__Img__Create: {
        path: `${PrefixPath.admin}/about-us/img-create`,
        getUrl() {return `${PrefixPath.admin}/about-us/img-create`},
    },
    AboutUs__Save: {
        path:`${PrefixPath.admin}/about-us/save`,
        getUrl() {return `${PrefixPath.admin}/about-us/save`},
    },
}

export const ADM_API_RM = AdminAPIRouterManager;
