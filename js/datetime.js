jQuery( function ( $ )
{
	'use strict';

	/**
	 * Update datetime picker element
	 * Used for static & dynamic added elements (when clone)
	 */
	function update()
	{
		var $this = $( this ),
			options = $this.data( 'options' ),
			$inline = $this.siblings( '.rwmb-datetime-inline' ),
			$timestamp = $this.siblings( '.rwmb-datetime-timestamp' ),
			current = $this.val();

		$this.siblings( '.ui-datepicker-append' ).remove(); // Remove appended text
		if ( $timestamp.length )
		{
			var $picker = $inline.length ? $inline : $this;
			options.onSelect = function ( date, inst )
			{
				$timestamp.val( Math.floor( getTimestamp( $picker.datetimepicker( 'getDate' ) ) / 1000 ) );
			};
		}

		if ( $inline.length )
		{
			options.altField = '#' + $this.attr( 'id' );
			$inline
				.removeClass( 'hasDatepicker' )
				.empty()
				.prop( 'id', '' )
				.datetimepicker( options )
				.datetimepicker( 'setDate', current );
		}
		else
		{
			$this.removeClass( 'hasDatepicker' ).datetimepicker( options );
		}
	}

	/**
	 * Convert date to Unix timestamp in milliseconds
	 * @link http://stackoverflow.com/a/14006555/556258
	 * @param date
	 * @return number
	 */
	function getTimestamp( date )
	{
		return Date.UTC( date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() );
	}

	// Set language if available
	if ( $.timepicker.regional.hasOwnProperty( RWMB_Datetimepicker.locale ) )
	{
		$.timepicker.setDefaults( $.timepicker.regional[RWMB_Datetimepicker.locale] );
	}
	else if ( $.timepicker.regional.hasOwnProperty( RWMB_Datetimepicker.localeShort ) )
	{
		$.timepicker.setDefaults( $.timepicker.regional[RWMB_Datetimepicker.localeShort] );
	}

	$( ':input.rwmb-datetime' ).each( update );
	$( '.rwmb-input' ).on( 'clone', ':input.rwmb-datetime', update );
} );
