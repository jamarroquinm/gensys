
    //The domain
    $sql = "Select
                concat('d-', right( concat('00000', id), 5 ) ) as id,
                id as internalId,
                name,
                description,
                multitenant,
                name as text,
                null as children
            From
                domain
            Where
                id = ? and active = 1 and deleted = 0";
    $args = array($id);
    $domain = get($sql, $args, true);


    //The modules
    $sql = "Select
                concat('m-', right( concat('00000', id), 5 ) ) as id,
                id as internalId,
                name,
                description,
                name as text,
                null as children
            From
                module
            Where
                domainId = ? and active = 1 and deleted = 0
            Order by
                name";

    $args = array($id);
    $modules = read($sql, $args, true);
    $modulesIds = array_column($modules, 'internalId');


    //Mainmenu
    $sql = "Select 
                concat('n-', right( concat('00000', id), 5 ) ) as id,
                id as internalId,
                moduleId,
                name,
                description,
                name as text,
                null as children
            From 
                menu
            where
                active = 1 and deleted = 0 and
                moduleId in ( 
                    Select id 
                    From module 
                    Where domainId = ? and active = 1 and deleted = 0
                )
            Order by
                moduleId, `order`";
    $args = array($id);
    $menus = read($sql, $args, true);
    $menusIds = array_column($menus, 'internalId');


    //Submenu options
    $sql = "Select 
                concat('o-', right( concat('00000', id), 5 ) ) as id,
                id as internalId,
                menuId,
                name,
                description,
                name as text,
                null as children
            From 
                `option`
            Where
                active = 1 and deleted = 0 and
                menuId in ( 
                    Select id 
                    From menu 
                    Where
                        active = 1 and deleted = 0 and 
                        moduleId in (
                            Select id 
                            From module 
                            Where domainId = ? and active = 1 and deleted = 0
                        )
                    )
            Order by
                menuId, `order`";
    $args = array($id);
    $options = read($sql, $args, true);
    $optionsIds = array_column($options, 'internalId');


    //Subsubmenu options
    $sql = "Select 
                concat('s-', right( concat('00000', id), 5 ) ) as id,
                id as internalId,
                optionId,
                name,
                description,
                name as text,
                1 as leaf
            From 
                suboption
            Where 
                active = 1 and deleted = 0 and
                optionId in ( 
                    Select 
                        id
                    From 
                        `option`
                    Where 
                        active = 1 and deleted = 0 and
                        menuId in ( 
                            Select id 
                            From menu 
                            Where
                                active = 1 and deleted = 0 and 
                                moduleId in (
                                    Select id 
                                    From module 
                                    Where domainId = ? and active = 1 and deleted = 0
                                )
                            )
                        )
            Order by
                optionId, `order`";
    $args = array($id);
    $suboptions = read($sql, $args, true);

    setError(0);

    //Submenu intergartion
    foreach( $suboptions as $suboption ) {

        $key = array_search( $suboption['optionId'], $optionsIds, true );

        if( is_numeric($key) ) {
            if( $options[$key]['children'] ) array_push( $options[$key]['children'], $suboption );
            else  $options[$key]['children'][0] = $suboption;
        }
    }


    //Menu integration
    foreach( $options as $option ) {

        $key = array_search( $option['menuId'], $menusIds, true );

        if( is_numeric($key) ) {
            if( $menus[$key]['children'] ) array_push( $menus[$key]['children'], $option );
            else  $menus[$key]['children'][0] = $option;
        }
    }


    //Module integration
    foreach( $menus as $menu ) {

        $key = array_search( $menu['moduleId'], $modulesIds, true );

        if( is_numeric($key) ) {
            if( $modules[$key]['children'] ) array_push( $modules[$key]['children'], $menu );
            else  $modules[$key]['children'][0] = $menu;
        }
    }

    //Solution integration
    $domain['children'] = $modules;

    return $domain;