
import React, { memo } from 'react'

/**
 * Format time duration
 *
 * @param milliseconds int
 * @return string (HH:mm:ss)
 **/
const durationTime = (milliseconds = null) => {
	if (!milliseconds ) return null

	var string = '';
	var total_hours, total_minutes, total_seconds, minutes, seconds;

	// get total values for each 
	total_seconds = Math.floor(milliseconds / 1000 )
	total_minutes = Math.floor(milliseconds / (1000 * 60) )
	total_hours = Math.floor(milliseconds / (1000 * 60 * 60))

	// get left-over number of seconds
	seconds = total_seconds - (total_minutes * 60 )
	if (seconds <= 9) seconds = '0'+ seconds
	if (seconds == 0) seconds = '00'

	// get left-over number of minutes
	minutes = total_minutes - (total_hours * 60 )
	if (minutes <= 9 && total_hours) minutes = '0'+ minutes
	if (minutes == 0) minutes = '0'

	if (total_hours) string += total_hours+':'
	if (minutes) string += minutes+':'
	if (seconds) string += seconds
		
	return string
}

/**
 * Format time duration as a human-friendly sentence
 *
 * @param milliseconds int
 * @return string (eg 2+ hours)
 **/
const durationSentence = (milliseconds = null) => {
	if (!milliseconds ) return null

	var string = '';
	var total_hours, total_minutes, total_seconds, minutes, seconds;

	// get total values for each 
	total_seconds = Math.floor(milliseconds / 1000 )
	total_minutes = Math.floor(milliseconds / (1000 * 60) )
	total_hours = Math.floor(milliseconds / (1000 * 60 * 60))

	if (total_hours > 1 ) return total_hours+'+ hrs'
	if (total_minutes > 1 ) return total_minutes+' mins'
	if (total_seconds ) return total_seconds+' sec'
}

export default memo((props) => {

	if (!props.data){
		return null;
	}

	switch(props.type){

		case 'total-time':
			var duration = 0;
			var tracks = props.data
			for(var i = 0; i < tracks.length; i++){
				if (tracks[i].duration ){
					duration += parseInt(tracks[i].duration);
				}
			}
			return durationSentence(duration);

		case 'length':
			return durationTime(props.data);

		case 'date':

			// A four-character date indicates just a year (rather than a full date)
			if (props.data.length == 4){
				return props.data;

			// Digest as a date string
			} else {
				var date = new Date(props.data);
				return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
			}

		case 'ago':
			var date = new Date(props.data)
			var diff = new Date() - date
			
			var seconds = Math.floor(diff / 1000)
			var minutes = Math.floor(diff / (1000 * 60))
			var hours = Math.floor(diff / (1000 * 60 * 60))
			var days = Math.floor(diff / (1000 * 60 * 60 * 24))

			if (seconds < 60){
				return seconds + " seconds";
			}else if (minutes < 60){
				return minutes + " minutes";
			}else if (hours < 24){
				return hours + " hours";
			} else {
				return days + " days"
			};

		default:
			return null;
	}
});
