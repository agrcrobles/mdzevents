// modified from https://github.com/atkinson/phonegap-prepopulate-db
databasePopulator = {
			/* open the database and return a reference to it
			If the database doesn't exist yet, create it. */
			init: function(databaseName, bytes)
			{
				console.log('initDatabase()');
				try
				{
					if (!window.openDatabase)
					{
						console.log('not supported');
					}
					else
					{                                   
						db = openDatabase(databaseName, '1.0', 'Testing', bytes);
					}
				} 
				catch(e)
				{
					// Error handling code goes here.
					if (e == 2)
					{
						// Version number mismatch.
						console.log("Invalid database version.");
					}
					else 
					{
						console.log("database.init error "+e+".");
					}
					return null;
				}
			},

			run_scripts: function(data, onSuccess, onError) {
				return databasePopulator.read_file(data, databasePopulator.populate_db, onSuccess, onError);
			},

			read_file: function(data, callback, onSuccess, onError  )
			{
				callback(data.split(';'), onSuccess, onError);
			},

			populate_exec_sql: function(tx, lines)
			{           
				// drop all tables;
				tx.executeSql("select 'drop table ' || name || ';' from sqlite_master where type = 'table';");
				for (var i = 0; i < lines.length; i++)
				{
					var query = lines[i].replace(/\n/g, '');        // strip newline
					query && query.length && tx.executeSql(query); // ignore empty lines
				}
			},
			
			populate_db: function(lines, onSuccess, onError)
			{
				db.transaction( function(tx) { databasePopulator.populate_exec_sql(tx, lines) }, onError, onSuccess);
			},
		}