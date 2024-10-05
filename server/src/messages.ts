export const messages = {
    'odv_e_1': {
        'en': `The object definition pattern is not followed, it should be of form: 'part(0,"Part")`,
        'ro': ''
    },
    'odv_e_2': {
        'en': `The line should start with an object definition of type part,beam,welding.`,
        'ro': ''
    },
    'odv_e_3': {
        'en': `The object definition pattern is not followed, it should be of form: 'part(0,"Part")'\r\nThe first argument should be an integer (for index) and the second a string (for name)`,
        'ro': ''
    }

    //Tabs
    ,
    'tdv_e_1': {
        'en': `This line should start with tab_page`,
        'ro': ''
    },
    'tdv_e_2': {
        'en': `This tab definition is required a parameter of type string e.g 'tab_page("TabIdentifier")'`,
        'ro': ""
    },
    'tdv_e_3': {
        'en': `This tab assignment is required parameters of type string,string and integer e.g 'tab_page("TabIndentifier","Tab display name",2)'`,
        'ro': ""
    },
    'tdv_e_4': {
        'en': `This line should either be a tab assignment e.g (tab_page("TabIndentifier","Tab display name",2)), a tab definition e.g. ('tab_page("TabIdentifier")') or modify(1) instruction`,
        'ro': ""
    },



    //Attributes

    'adv_e_1': {
        'en': 'An attribute must start with attribute , unique_attribute or picture',
        'ro': ''
    },
    'adv_e_2': {
        'en': `A picture attribute must contain the following parameters:(image_name,width,height,horizontal_offset,vertical_offset). For more see 'https://support.tekla.com/doc/tekla-structures/2023/sys_objects_inp_properties_composite'`,
        'ro': ''
    },
    'adv_e_3': {
        'en': `A unique attribute pattern requires specific arguments (8,9 or 11). For more see 'https://support.tekla.com/doc/tekla-structures/2023/sys_objects_inp_properties_composite'`,
        'ro': ''
    },
    'adv_e_4': {
        'en': `A label attribute must not have the width property (the last one). For more see 'https://support.tekla.com/doc/tekla-structures/2023/sys_objects_inp_properties_composite'`,
        'ro': ''
    }

}

exports.messages = messages;