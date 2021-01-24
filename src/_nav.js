export default {
  top: [
    {
      name: 'Home',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Category',
      icon: 'Layers',
      url: '/catagory',
      children: [
        {
          name: 'Catagories',
          url: '/category',
        },
        {
          name: 'Add new catagory',
          url: '/newcategory',
        },
        {
          name: 'Alerts',
          url: '/elements/alerts',
        },
        {
          name: 'Typography',
          url: '/elements/typography',
        },
        {
          name: 'Cards',
          url: '/elements/cards',
        },
        {
          name: 'Tabs',
          url: '/elements/tabs',
        },
        {
          name: 'Tables',
          url: '/elements/tables',
        },
        {
          name: 'Breadcrumbs',
          url: '/elements/breadcrumbs',
        },
        {
          name: 'Forms',
          url: '/elements/forms',
        },
        {
          name: 'Modals',
          url: '/elements/modals',
        },
        {
          name: 'Loaders',
          url: '/elements/loaders',
        },
        {
          name: 'Avatars',
          url: '/elements/avatars',
        },
        {
          name: 'Progress Bars',
          url: '/elements/progressbars',
        },
        {
          name: 'Pagination',
          url: '/elements/pagination',
        },
      ],
    },
    {
      name: 'Post',
      icon: 'File',
      children: [
        {
          name: 'Posts',
          url: '/post/list',
        },
        {
          name: 'Add new post',
          url: '/post/add',
        },
        // {
        //   name: 'Blank',
        //   url: '/pages/blank',
        // },
        // {
        //   name: 'Sub Navigation',
        //   url: '/pages/subnav',
        // },
        // {
        //   name: '404',
        //   url: '/pages/404',
        // },
      ],
    },
    // {
    //   name: 'Apps',
    //   icon: 'Cloud',
    //   children: [
    //     {
    //       name: 'Analytics',
    //       url: '/apps/analytics',
    //     },
    //     {
    //       name: 'Invoice',
    //       url: '/apps/invoice',
    //     },
    //     {
    //       name: 'Activity Feed',
    //       url: '/apps/feed',
    //     },
    //     {
    //       name: 'CMS',
    //       url: '/apps/cms',
    //     },
    //   ],
    // },
    {
      divider: true,
    },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'Package',
    //   badge: {
    //     text: 'NEW',
    //   },
    // },
  ],
  bottom: [
    // {
    //   name: 'Get Vibe',
    //   url: 'https://github.com/NiceDash/Vibe',
    //   icon: 'GitHub',
    //   external: true,
    //   target: '_blank',
    // },
    {
      name: 'Logout',
      url: '/logout',
      icon: 'User',
      badge: {
        variant: 'success',
      },
    },
  ],
};
