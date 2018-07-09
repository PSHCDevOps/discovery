
LayoutManager.initializers.listings = function() {
    EventManager.subscribe('dataChanged', LayoutManager.toggleZones);
};

LayoutManager.render = function(results) {
    $(document).prop('title', "Results - " + DataManager.title);

    $('#pool_vendors th span').tooltip();

    LayoutManager.updatePoolInfo();
    LayoutManager.updateResultsInfo(results);
    LayoutManager.renderVendors(results);
};

LayoutManager.renderVendors = function(results) {
    var $table = $('#pool_vendors');
    var qs = DataManager.getQueryString({'pool': null});
    var len = results['results'].length;

    $table.find('tr').not(':first').remove();

    if (results['count'] == 0) {
        $('#no_matching_vendors').show();
    } else {
        $('#no_matching_vendors').hide();
    }

    for (var i = 0; i < len; i++) {
        $table.append(LayoutManager.renderRow(results['results'][i], qs, i));
    }

    $('#pool_table').show();

    LayoutManager.renderPager(results);
};

LayoutManager.renderRow = function(vendor, qs, i) {
    var location_col, num_contracts_col;
    var $vendorRow = $('<tr class="table_row_data"></tr>');

    var locationStr = (vendor.sam_location_citystate ? LayoutManager.cleanLocation(vendor.sam_location_citystate) : ' ');
    var name_col = $('<td class="vendor_name" scope="row"></td>');
    var name_a = $('<a href="/vendor/' + vendor.duns + '/' + qs + '" class="link_style">' + vendor.name + '</a>');

    name_col.append(name_a);
    $vendorRow.append(name_col);

    location_col = $('<td class="vendor_location">' + locationStr + '</td>');
    $vendorRow.append(location_col);

    num_contracts_col = $('<td class="naics_results">' + vendor.number_of_contracts + '</td>');
    $vendorRow.append(num_contracts_col);

    //add socio-economic columns
    if (vendor.setasides.length > 0) {
        $vendorRow.append(LayoutManager.renderColumn(vendor, '8a', 'A6'));
        $vendorRow.append(LayoutManager.renderColumn(vendor, 'Hubz', 'XX'));
        $vendorRow.append(LayoutManager.renderColumn(vendor, 'sdvo', 'QF'));
        $vendorRow.append(LayoutManager.renderColumn(vendor, 'wo', 'A2'));
        $vendorRow.append(LayoutManager.renderColumn(vendor, 'vo', 'A5'));
        $vendorRow.append(LayoutManager.renderColumn(vendor, 'sdb', '27'));
    }
    else {
        $vendorRow.append($('<td colspan="6" class="unrestricted"></td>'));
    }

    return $vendorRow;
};

LayoutManager.renderColumn = function(v, prefix, setasideCode) {
    var $col = $('<td class="' + prefix + '"></td>');
    if (LayoutManager.findIndicatorMatch(v, prefix, setasideCode)) {
        $col.html('<img src="'+ static_image_path + 'green_dot.png" class="green_dot">');
    }
    return $col;
};

LayoutManager.renderPager = function(results, pageNumber, itemsPerPage) {
    var page = DataManager.getPage();
    var pageCount = DataManager.getPageCount();
    var resultCount = results['results'].length;

    if (results['count'] > 0) {
        var startnum = (page - 1) * pageCount + 1;
        var endnum = Math.min((page * pageCount), results['count']);

        $("#vendors_current").text(startnum + " - " + endnum);
        $("#vendors_total").text(LayoutManager.numberWithCommas(results['count']));

        $(function() {
            $("#pagination_container").pagination({
                items: results['count'],
                itemsOnPage: pageCount,
                cssStyle: 'light-theme',
                currentPage: page,
                onPageClick: function(pageNumber, e) {
                    DataManager.page = pageNumber;
                    EventManager.publish("vendorsChanged");
                }
            });
        });
        if (resultCount < results['count']) {
            $('#pagination_container').show();
        } else {
            $('#pagination_container').hide();
        }
        $("#viewing_vendors").show();

    } else {
        $('#pagination_container').hide();
        $("#viewing_vendors").hide();
    }
};

LayoutManager.updateResultCSVURL = function() {
    var qs = DataManager.getQueryString();
    $("#csv_link").attr("href", "/results/csv/" + qs);
};

LayoutManager.updatePoolInfo = function() {
    var vehiclePools = DataManager.getVehiclePools();
    var pool = DataManager.getPool();
    var poolNames = [];
    var pools;

    if (pool) {
        pools = [pool.id];
    }
    else {
        pools = Object.keys(vehiclePools).sort();
    }

    if (pools.length > 0) {
        for (var index = 0; index < pools.length; index++) {
            var pool = vehiclePools[pools[index]];

            if (pools.length > 1) {
                var url = DataManager.getURL({'vehicle': pool.vehicle, 'pool': pool.id});
                poolNames.push('<div class="pool"><div class="spacer"/><a class="pool_filter_link" href="' + url + '"><span class="vehicle">' + pool.vehicle.split('_').join(' ') + " pool " + pool.number + ':</span><span class="title">' + pool.name + '</span></a></div>');
            }
            else {
                poolNames.push('<div class="pool"><div class="spacer"/><span class="vehicle">' + pool.vehicle.split('_').join(' ') + " pool " + pool.number + ':</span><span class="title">' + pool.name + '</span></div>');
            }
        }
        $(".results_pool_names").html(poolNames.join(''));
    }
};

LayoutManager.updateResultsInfo = function(results) {
    var totalResults, totalPools, resultsStr;
    if (results['count'] == 0) {
        totalResults = 0;
        totalPools = 0;
    }
    else {
        totalResults = results['count'].toString();
        totalPools = results['results'].length;
    }
    resultsStr = totalResults + " vendors match your search";

    LayoutManager.updateResultCSVURL();

    $("#number_of_results span").text(resultsStr);
};

LayoutManager.findIndicatorMatch = function(v, prefix, setasideCode) {
    var i, len = v['setasides'].length - 1;

    if (v['setasides'].length > 0) {
        for (var i=0; i <= len; i++) {
            if (v['setasides'][i]['code'] == setasideCode) {
                return true;
            }
        }
    }
    return false;
};

LayoutManager.cleanLocation = function(loc) {
    var location_obj = {};
    var new_location = loc;

    if (loc) {
        loc = loc.trim();
        var comma = loc.indexOf(',');
        location_obj.city = loc.slice(0, comma);
        var after = loc.substring(comma + 2);
        var space = after.lastIndexOf(' ');
        location_obj.state = after.slice(0, space).toUpperCase();

        if (location_obj.city.match(/^\s*$/) || location_obj.state.match(/^\s*$/)) {
            new_location = '';
        }
        else {
            new_location = LayoutManager.toTitleCase(location_obj.city) + ', ' + location_obj.state;
        }
    }
    return new_location;
};
