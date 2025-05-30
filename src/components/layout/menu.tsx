import { Home, Airplay, Box, FolderPlus, Command, Cloud, FileText, Server, BarChart, Users, Layers, ShoppingBag, List, Mail, MessageCircle, GitPullRequest, Monitor, Heart, Clock, Zap, CheckSquare, Calendar, Image, Film, HelpCircle, Radio, Map, Edit, Sunrise, Package } from 'react-feather'
import { RoutesPaths } from '../../router/config/routesPaths'
export const MENUITEMS = [
    {
        menutitle:"General",
        menucontent:"Dashboards,Widgets",
        Items:[
            {
                title: 'Dashboard', icon: Home, type: 'sub',badge: "badge badge-success",badgetxt:"2", active: false, children: [
                    { path: `${RoutesPaths.root}/dashboard/default`, title: 'Default', type: 'link' },
                    { path: `${RoutesPaths.root}/dashboard/ecommerce`, title: 'Ecommerce', type: 'link' },
                ]
            },
            {
                title: 'Widgets', icon: Airplay, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/widgets/general`, title: 'General', type: 'link' },
                    { path: `${RoutesPaths.root}/widgets/chart`, title: 'Chart', type: 'link' },
                ]
            },
        ]
    },

    {
        menutitle:"Applications",
        menucontent:"Ready to use Apps",
        Items:[
            {
                title: 'Project',icon:Box, type: 'sub',badge: "badge badge-danger",badgetxt:"New",active:false, children: [
                    { path: `${RoutesPaths.root}/app/project/project-list`, type: 'link', title: 'Project List' },
                    { path: `${RoutesPaths.root}/app/project/new-project`, type: 'link', title: 'Create New' }
                ]
            },
            {
                title: 'Ecommerce', icon:ShoppingBag, type: 'sub',active:false, children: [
                    { path: `${RoutesPaths.root}/app/ecommerce/product`, title: 'Product', type: 'link' },
                    { path: `${RoutesPaths.root}/app/ecommerce/product-page/1`, title: 'Product Page', type: 'link' },
                    { path: `${RoutesPaths.root}/app/ecommerce/product-list`, title: 'Product List', type: 'link' },
                    { path: `${RoutesPaths.root}/app/ecommerce/payment-details`, title: 'Payment Detail', type: 'link' },
                    { path: `${RoutesPaths.root}/app/ecommerce/orderhistory`, title: 'Order History', type: 'link' },
                    { path: `${RoutesPaths.root}/app/ecommerce/pricing`, title: 'Pricing', type: 'link' },
                ]
            },
            {
                title: 'Users', icon:Users, path:`${RoutesPaths.root}/app/users/userProfile`, type: 'sub',bookmark:true,active:false, children: [
                    { path: `${RoutesPaths.root}/app/users/userProfile`, type: 'link', title: 'Users Profile ' },
                    { path: `${RoutesPaths.root}/app/users/userEdit`, type: 'link', title: 'Users Edit' },
                    { path: `${RoutesPaths.root}/app/users/userCards`, type: 'link', title: 'Users Cards' },
                ]
            },
            {
                title: 'Calender', icon:Calendar, type: 'sub',active:false, children: [
                    { path: `${RoutesPaths.root}/app/calendar/basic-calendar`, type: 'link', title: 'Calender', },
                    { path: `${RoutesPaths.root}/app/calendar/draggable-calendar`, type: 'link', title: 'Draggable' },
                ]
            },
            { path: `${RoutesPaths.root}/app/chat-app`,icon:MessageCircle, title: 'Chat-app', type: 'link' },
            { path: `${RoutesPaths.root}/app/email-app`,icon:Mail, title: 'Email-app', type: 'link' },
            { path: `${RoutesPaths.root}/app/file-manager`,icon:GitPullRequest, title: 'File Manager', type: 'link' },
            { path: `${RoutesPaths.root}/app/kanban-board`,icon:Monitor,badge: "badge badge-info",badgetxt:"latest", title: 'Kanban Board', type: 'link' },
            { path: `${RoutesPaths.root}/app/bookmark`,icon:Heart, type: 'link', title: 'Bookmark' },
            { path: `${RoutesPaths.root}/app/task`,icon:CheckSquare, type: 'link', title: 'Task'},
            { path: `${RoutesPaths.root}/app/social-app`,icon:Zap, type: 'link', title: 'Social App', bookmark: true },
            { path: `${RoutesPaths.root}/app/contact`,icon:List, type: 'link', title: 'Contacts' },
            { path: `${RoutesPaths.root}/app/todo-app/todo`,icon:Clock, type: 'link', title: 'To-Do' },
            { path: `${RoutesPaths.root}/app/todo-app/todo-firebase`,icon:Clock, type: 'link', title: 'To-Do-Firebase' },
        
        ]
    },

    {
        menutitle:"Components",
        menucontent:"UI Components & Elements",
        Items:[
            {
                title: 'Ui-Kits', icon: Box, type: 'sub',  active: false, children: [
                    { path: `${RoutesPaths.root}/ui-kits/statecolor`, title: 'State-color', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/typography`, title: 'Typography', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/avatar`, title: 'Avatars', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/helperclass`, title: 'Helper-Classes  ', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/grid`, title: 'Grid', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/tagsandpills`, title: 'Tag & Pills', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/progress-bar`, title: 'Progress', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/modal`, title: 'Modal', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/alert`, title: 'Alert', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/popover`, title: 'Popover', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/tooltips`, title: 'Tooltip', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/spinner`, title: 'Spinners', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/dropdown`, title: 'Dropdown ', type: 'link' },
                    { path: `${RoutesPaths.root}/ui-kits/accordion`, title: 'Accordion', type: 'link' },
            {
                title: 'Tabs', type: 'sub', children: [
                    { title: 'Bootstrap Tabs', type: 'link', path: `${RoutesPaths.root}/ui-kits/tab-bootstrap` },
                    { title: 'Line Tabs', type: 'link', path: `${RoutesPaths.root}/ui-kits/tab-line` },
                ]
            },
            { path: `${RoutesPaths.root}/ui-kits/shadow`, title: 'Shadow', type: 'link' },
            { path: `${RoutesPaths.root}/ui-kits/list`, title: 'List', type: 'link' },
            
            ]
            },

            {
                title: 'Bonus Ui', icon: FolderPlus,  type: 'sub', badge1: true, active: false, children: [
                    { path: `${RoutesPaths.root}/bonus-ui/scrollable`, title: 'Scrollable ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/bootstrap-notify`, title: 'Bootstrap Notify ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/rating`, title: 'Rating', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/dropzone`, title: 'Dropzone', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/tourComponent`, title: 'Tour ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/sweetAlert`, title: 'SweetAlert ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/carousel`, title: 'Owl Carousel', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/ribbons`, title: 'Ribbons', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/pagination`, title: 'Pagination', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/breadcrumb`, title: 'Breadcrumb ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/rangeSlider`, title: 'Range Slider ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/imageCropper`, title: 'Image Cropper ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/stickyNotes`, title: 'Sticky ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/dragNDropComp`, title: 'Drag and Drop ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/image-upload`, title: 'Upload', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/card/basicCards`, title: 'Basic Card ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/card/creativeCards`, title: 'Creative Card ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/card/tabCard`, title: 'Tabbed Card ', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/card/draggingCards`, title: 'Draggable Card', type: 'link' },
                    { path: `${RoutesPaths.root}/bonus-ui/timelines/timeline1`, title: 'Timeline', type: 'link' }
            ]
            },

            {
                title: 'Icons', icon: Command, path: `${RoutesPaths.root}/icons/flagIcons`, type: 'sub', active: false, bookmark: true, children: [
                    { path: `${RoutesPaths.root}/icons/flagIcons`, title: 'Flag Icon', type: 'link' },
                    { path: `${RoutesPaths.root}/icons/fontAwsomeIcon`, title: 'Fontawesome Icon ', type: 'link' },
                    { path: `${RoutesPaths.root}/icons/icoIcons`, title: 'Ico Icon ', type: 'link' },
                    { path: `${RoutesPaths.root}/icons/themifyIcons`, title: 'Themify Icon ', type: 'link' },
                    { path: `${RoutesPaths.root}/icons/featherIcons`, title: 'Feather Icon ', type: 'link' },
                    { path: `${RoutesPaths.root}/icons/weatherIcons`, title: 'Whether Icon ', type: 'link' },
            ]
            },

            {
            
                title: 'Buttons', icon: Cloud, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/buttons/default-btn`, title: 'Default Style ', type: 'link' },
                    { path: `${RoutesPaths.root}/buttons/flatBtn`, title: 'Flat Style', type: 'link' },
                    { path: `${RoutesPaths.root}/buttons/edgeBtn`, title: 'Edge Style', type: 'link' },
                    { path: `${RoutesPaths.root}/buttons/raisedBtn`, title: 'Raised Style', type: 'link' },
                    { path: `${RoutesPaths.root}/buttons/groupBtn`, title: 'Button Group', type: 'link' },
            ]
            },

            {
                title: 'Charts', icon: BarChart, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/charts/apexCharts`, type: 'link', title: 'Apex Chart' },
                    { path: `${RoutesPaths.root}/charts/googleChart`, type: 'link', title: 'Google Chart' },
                    { path: `${RoutesPaths.root}/charts/knobChart`, type: 'link', title: 'Knob Chart' },
                    { path: `${RoutesPaths.root}/charts/chartJs`, type: 'link', title: 'Chartjs' },
                    { path: `${RoutesPaths.root}/charts/chartistComponent`, type: 'link', title: 'Chartist' },
            ]
            },

        ]
    },
    
    
    {
        menutitle:"Forms & Table",
        menucontent:"Ready to use froms & tables",
        Items:[
            {
                title: 'Forms', icon: FileText, type: 'sub', menutitle:"Forms & Table",menucontent:"Ready to use froms & tables", active: false, children: [
            {
                title: ' Form Controls ', type: 'sub', children: [
                    { title: 'Form Validation', type: 'link', path: `${RoutesPaths.root}/forms/form-validation` },
                    { title: 'Basic Input', type: 'link', path: `${RoutesPaths.root}/forms/baseInput` },
                    { title: 'Checkbox & Radio', type: 'link', path: `${RoutesPaths.root}/forms/radio-checkbox` },
                    { title: 'Input Groups', type: 'link', path: `${RoutesPaths.root}/forms/inputGroup` },
                    { title: 'Mega Option', type: 'link', path: `${RoutesPaths.root}/forms/megaOptions` },

                ]
            },
            {
                title: 'Form Widgets', type: 'sub', children: [
                    { title: 'Datepicker', type: 'link', path: `${RoutesPaths.root}/form-widget/datepicker` },
                    { title: 'Timepicker', type: 'link', path: `${RoutesPaths.root}/form-widget/timepicker` },
                    { title: 'Typeahead', type: 'link', path: `${RoutesPaths.root}/form-widget/typeahead` },
                ]
            },
            {
                title: 'Form Layout', type: 'sub', children: [
                    { path: `${RoutesPaths.root}/form-layout/formDefault`, title: 'Form Default', type: 'link' },
                    { path: `${RoutesPaths.root}/form-layout/formWizard`, title: 'Form Wizard', type: 'link' },
                ]
            },
            ],
            },

            {
                title: 'Tables', icon: Server, type: 'sub', children: [
                    {
                        title: ' Reactstrap Table ', type: 'sub', children: [
                            { title: 'Basic Table', type: 'link', path: `${RoutesPaths.root}/table/basic` },
                            { title: 'Sizing Table', type: 'link', path: `${RoutesPaths.root}/table/sizing` },
                            { title: 'Border Table', type: 'link', path: `${RoutesPaths.root}/table/border` },
                            { title: 'Styling Table', type: 'link', path: `${RoutesPaths.root}/table/styling` },
                        ]
                    },
                    {
                        title: 'Data Tables', path: `${RoutesPaths.root}/table/datatable`, type: 'link'
                    }
                ]
            },
        ]
    },

    {
        menutitle:"Pages",
        menucontent:"All neccesory pages added",
        Items:[
            {
                title: 'Pages', icon: Layers, type: 'sub', badge2: true, active: false, children: [
                    { path: `${RoutesPaths.root}/pages/samplepage`, title: 'Sample Page', type: 'link' },  
                    { path: `${RoutesPaths.root}/pages/searchpage`, title: 'Search Pages', type: 'link' },
        
            ]
            }
        ]
    },

    {
        menutitle:"Miscellaneous",
        menucontent:"Bouns Pages & Apps",
        Items:[
            {
                title: 'Gallery', icon: Image, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/app/gallery/imageGallery`, title: 'Gallery Grid ', type: 'link' },
                    { path: `${RoutesPaths.root}/app/gallery/imageWithDesc`, title: 'Gallery Grid  Desc ', type: 'link' },
                    { path: `${RoutesPaths.root}/app/gallery/mesonryGallery`, title: 'Masonry Gallery', type: 'link' },
                    { path: `${RoutesPaths.root}/app/gallery/mesonryDesc`, title: 'Masonry With Desc', type: 'link' },
                    { path: `${RoutesPaths.root}/app/gallery/imageHover`, title: 'Hover Effect', type: 'link' }
            ]
            },
            
            {
                title: 'Blog',icon: Film, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/app/blog/blogDetail`, title: 'Blog Details', type: 'link' },
                    { path: `${RoutesPaths.root}/app/blog/blogSingle`, title: 'Blog Single', type: 'link' },
                    { path: `${RoutesPaths.root}/app/blog/blogPost`, title: 'Add Post', type: 'link' },
                ]
            },
            {
                title: 'Job Search',icon: Package, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/app/jobSearch/cardView`, title: 'Cards View', type: 'link' },
                    { path: `${RoutesPaths.root}/app/jobSearch/job-list`, title: 'List View', type: 'link' },
                    { path: `${RoutesPaths.root}/app/jobSearch/job-detail`, title: 'Job Details', type: 'link' },
                    { path: `${RoutesPaths.root}/app/jobSearch/job-apply`, title: 'Apply', type: 'link' }
                ]
            },
            {
                title: 'Learning',icon: Radio, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/app/learning/learning-list`, title: 'Learning List', type: 'link' },
                    { path: `${RoutesPaths.root}/app/learning/learning-detail`, title: 'Detail Course', type: 'link' },
                ]
            },
            {
                title: 'Maps', icon: Map, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/app/map/googleMap`, type: 'link', title: 'Google Maps ' },
                ]
            },
            {
                title: 'Editor', icon: Edit, type: 'sub', active: false, children: [
                    { path: `${RoutesPaths.root}/app/editor/ckEditor`, type: 'link', title: 'CK  Editor' },
                    { path: `${RoutesPaths.root}/app/editor/mdeEditor`, type: 'link', title: 'MDE Editor' },
                ]
            },
    
            { path: `${RoutesPaths.root}/app/faq`,icon: HelpCircle,  type: 'link',active:false, title: 'FAQ' },
            { path: `${RoutesPaths.root}/app/knowledgebase`,icon: Sunrise,  type: 'link',active:false,title: 'Knowledgebase' },
            { path: `${RoutesPaths.root}/app/support-ticket`,icon: Users,  type: 'link', active:false,title: 'Support Ticket' },
    ]   
    },
]