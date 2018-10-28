const mongoose = require( 'mongoose' );
var env = process.env.NODE_ENV || 'dev';
var dbURI = (env == 'dev')? "mongodb://127.0.0.1:27017/hackathon-project" : process.env.MONGODB_URI;
// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model('Host', 'hostSchema');

var date = Date.now();

var hostData = [
	{
		name: "New Wok's Kitchen",
		email: "Wokskitchen@domain.com",
		user_type: "host",
		location: {
			line1: "355 Kessina blvd",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11365",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7397291, -73.8174079],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 5,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "El Guchito",
		email: "Guachito@domain.com",
		user_type: "host",
		location: {
			line1: "158 Horace Harding Exp",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11365",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7390544, -73.8157986],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "Lake Pavilion Restaurant",
		email: "lakepav@domain.com",
		user_type: "host",
		location: {
			line1: "6015 Main St",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11365",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7415274, -73.8264233],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "National Wholesale Liquidators",
		email: "NWL@domain.com",
		user_type: "host",
		location: {
			line1: "7101 Kissena Blvd",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11367",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7303168, 73.8149642],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "Valentino's",
		email: "Valentino@domain.com",
		user_type: "host",
		location: {
			line1: "71-47 Kissena Blvd",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11365",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.72914, -73.8154912],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "Aria Kabab",
		email: "AriaKabab@domain.com",
		user_type: "host",
		location: {
			line1: "72-55 Kissena Blvd",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11365",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7292824, -73.8157424],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "Eastern",
		email: "Eastern@domain.com",
		user_type: "host",
		location: {
			line1: "70-47 Parsons Blvd",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11365",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7321605, -73.8112899],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	},
	{
		name: "NAPA Auto Parts - Flushing Automotive Inc",
		email: "NAPA@domain.com",
		user_type: "host",
		location: {
			line1: "5901 Main St",
			line2: " ",
			state: "New York",
			city: "Flushing",
			zip_code: "11355",
		},
		geo_location: {
			type: "Point",
			coordinates: [40.7341933, -73.8192293],
		},
		password: "safekeep",
		resetPasswordToken: "true",
		resetPasswordExpires: date,
		spots: 10,
		spots_available: 0,
		created_at: date,
		updated_at: date,
	}
];

function seedDB() {
  //Remove all in db
  Host.remove({}, function(err) {
  	if (err) {
  		console.log(err);
  	}
  	console.log("removed all hosts!");
  });

  for(let i=0; i<hostData.length; i++){
  	Host.create(hostData[i], function(err, result) {
  		if (err) {
  			console.log(err);
  		}else{
  			result.save();
  			console.log("Successfully Seeded!")
  		}
  	});
  }
}

module.exports = seedDB;