( function ( $, rwmb ) {
    'use strict';

    $( '.rwmb-taxonomy-add-button' ).rwmbModal( {
        callback: function ( modal ) {
            $( modal ).find( '#wpcontent' ).css( 'margin-left', 0 );
        }
    } );
    
} )( jQuery, rwmb );
