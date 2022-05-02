import pkg from 'mongoose';
const {Schema, model} = pkg;

const unitSchema = new Schema({
	_id: {
		type: Number,
		required: true
	},
	id: {
		type: Number,
		required: true
	},
	data_updated: String,
	vehicle_id: {
		type: Number,
		required: true
	},
	vehicle_label: Number,
	vehicle_current_status: Number,
	position_latitude: String,
	position_longitude: String,
	geographic_point: String,
	position_speed: Number,
	position_odometer: Number,
	trip_schedule_relationship: Number,
	trip_id: Number,
	trip_start_date: Number,
	trip_route_id: Number,
	direction: String,
	town_hall: String,
	federal_entity: String
});

export default model('Units', unitSchema);
