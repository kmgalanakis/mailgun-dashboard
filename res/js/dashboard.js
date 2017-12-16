var MailgunDashboard_Dashboard = function( $ ) {

    var self = this;

    self.mgd_dashboard_action = 'mgd_get_mailgun_dashboard_api';

    self.getMailgunEvents = function() {
        var data = {
            action:	self.mgd_dashboard_action,
            type: 'events'
        };

        $.ajax( {
            url: ajaxurl,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function( response ) {
                var eventsTableContainer = $( '#mgd-log-events-chart' );
                if ( response.success ) {
                    eventsTableContainer.fadeIn();

                    $( '.js-mgd-refresh-dashboard' ).fadeIn();
                } else {
                    self.consoleWarnErrors( response.data );
                }
                eventsTableContainer.prev( '.mgd-loading-section' ).fadeOut();
            }
        });
    };

    self.getMailgunLog = function() {
        var data = {
            action:	self.mgd_dashboard_action,
            type: 'log'
        };

        $.ajax( {
            url: ajaxurl,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function( response ) {
                var logTableContainer = $( '#mgd-log-table-container' );
                if ( response.success ) {
                    var logTable = $( '#mgd-log-table' );
                    var logTableBody = $( '#mgd-log-table tbody' );
                    logTable.DataTable().destroy();
                    logTableBody.empty();

                    $.each( JSON.parse( response.data ).items, function( index, value ) {
                        var newRow = '<tr>' +
                                        '<td class="status ' + value.type + '" title="' + mailgun_dashboard_dashboard_texts.eventStatus[ value.type ] + '"></td>' +
                                        '<td>' +
                                            value.created_at +
                                        '</td>' +
                                        '<td>' +
                                            value.message +
                                        '</td>' +
                                    '</tr>';
                        logTableBody.append( newRow );
                    });

                    logTable.DataTable(
                        {
                            'iDisplayLength': 25,
                            'order': [[ 1, 'desc' ]],
                            'columnDefs': [
                                {
                                    'targets': [0, 2],
                                    'orderable': false
                                },
                                {
                                    'type': 'date',
                                    'targets': [1]
                                }
                            ],
                            bAutoWidth: false ,
                            aoColumns : [
                                { sWidth: '1%' },
                                { sWidth: '15%' },
                                { sWidth: '73%' }
                            ],
                            'language' : {
                                'decimal': mailgun_dashboard_dashboard_texts.decimal,
                                'emptyTable': mailgun_dashboard_dashboard_texts.emptyTable,
                                'info': mailgun_dashboard_dashboard_texts.info,
                                'infoEmpty': mailgun_dashboard_dashboard_texts.infoEmpty,
                                'infoFiltered': mailgun_dashboard_dashboard_texts.infoFiltered,
                                'infoPostFix': mailgun_dashboard_dashboard_texts.infoPostFix,
                                'thousands': mailgun_dashboard_dashboard_texts.thousands,
                                'lengthMenu': mailgun_dashboard_dashboard_texts.lengthMenu,
                                'loadingRecords': mailgun_dashboard_dashboard_texts.loadingRecords,
                                'processing': mailgun_dashboard_dashboard_texts.processing,
                                'search': mailgun_dashboard_dashboard_texts.search,
                                'zeroRecords': mailgun_dashboard_dashboard_texts.zeroRecords,
                                'paginate': {
                                    'first': mailgun_dashboard_dashboard_texts.first,
                                    'last': mailgun_dashboard_dashboard_texts.last,
                                    'next': mailgun_dashboard_dashboard_texts.next,
                                    'previous': mailgun_dashboard_dashboard_texts.previous
                                },
                                'aria': {
                                    'sortAscending': mailgun_dashboard_dashboard_texts.sortAscending,
                                    'sortDescending': mailgun_dashboard_dashboard_texts.sortDescending
                                }
                            }
                        }
                    );

                    logTableContainer.fadeIn();

                    $( '.js-mgd-refresh-dashboard' ).fadeIn();
                } else {
                    self.consoleWarnErrors( response.data );
                }

                logTableContainer.prev( '.mgd-loading-section' ).fadeOut();
            }
        });
    };

    self.consoleWarnErrors = function( data ) {
        $.each( data, function( key, value ) {
            alert( mailgun_dashboard_dashboard_texts.mailgun_api_failed + '!' + '\n' + mailgun_dashboard_dashboard_texts.console_for_info + '.' );
            console.warn( mailgun_dashboard_dashboard_texts.mailgun_api_error + ': ' +  key + ' => ' + value );
        });
    };

    self.drawChart = function() {
        var barChartData = JSON.parse( '{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"Dataset 1","backgroundColor":"rgb(255, 99, 132)","data":[80,-72,-72,81,96,27,54]},{"label":"Dataset 2","backgroundColor":"rgb(54, 162, 235)","data":[-3,-47,83,-86,-10,49,-70]},{"label":"Dataset 3","backgroundColor":"rgb(75, 192, 192)","data":[22,38,-70,-70,-69,-5,-1]}]}' );
        var ctx = document.getElementById("canvas");
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                title:{
                    display:true,
                    text:"Chart.js Bar Chart - Stacked"
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    };

    $( document ).on( 'click', '.js-mgd-refresh-dashboard-button', function() {
        var eventsTableContainer = $( '#mgd-log-events-chart' );
        eventsTableContainer.prev( '.mgd-loading-section' ).fadeIn();
        eventsTableContainer.fadeOut();

        var logTableContainer = $( '#mgd-log-table-container' );
        logTableContainer.prev( '.mgd-loading-section' ).fadeIn();
        logTableContainer.fadeOut();

        $( '.js-mgd-refresh-dashboard') .fadeOut();

        self.getMailgunLog();
        self.getMailgunEvents();
    });

    self.init = function() {
        self.getMailgunEvents();
        self.getMailgunLog();
        self.drawChart();
    };

    self.init();

};

jQuery( document ).ready( function( $ ) {
    var dashboardInstance = new MailgunDashboard_Dashboard( $ );
});