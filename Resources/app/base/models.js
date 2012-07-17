/**
 * @file overview This file contains the core framework class CBMVC.
 * @author Winson  winsonet@gmail.com
 * @copyright Winson https://github.com/CBMVC/CBMVC-Framework-with-Titanium
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * 
 */

/**
 * The data models, include all data operation
 */
CB.Models = (function() {
  var m = {};

  m.human = new CB.DB.model({
    table:    'human',
    columns:  {
      id:                 'INTEGER PRIMARY KEY AUTOINCREMENT',
      city_id:            'INTEGER',
      first_name:         'TEXT',
      last_name:          'TEXT'
    },
		methods : {
			getByFirstName : function(firstName) {
				// get by firstName
				var result = CB.DB.models.get('human').findOneBy('first_name', firstName);

				if (!result) {
					throw 'Could not find a firstName  with the  ' + firstName + '!';
				} else {
					return result;
				}
			}
		}
  });

  m.city = new CB.DB.model({
    table:    'city',
    columns:  {
      id:                 'INTEGER PRIMARY KEY AUTOINCREMENT',
      country_id:         'INTEGER',
      name:               'TEXT',
      description:        'TEXT'
    }
  });

  m.country = new CB.DB.model({
    table:    'country',
    columns:  {
      id:                 'INTEGER PRIMARY KEY AUTOINCREMENT',
      name:               'TEXT'
    }
  });

  return m;
})();
