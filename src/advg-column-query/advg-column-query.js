"use strict";
/**
     * @customElement
     * @polymer
     */
    class AdvgColumnQuery extends Polymer.Element {
      static get is() { return 'advg-column-query'; }
      static get properties() {
          return {
              prop1: {
                  type: String,
                  value: 'advg-column-query'
              },
              items: {
                  type: Array,
                  value : []
              },
              table_name: {
                  type: String,
                  value: ""
              },
              column_name:
              {
                  type: String,
                  value: ""
              }
          };
      }
        async click_query() {
            this.items = [];
            //var r = exec_query(api_url+"/adv_gui.column_query",{table_name: this.table_name, column_name: this.column_name})
            var r = await fetchAsync(api_url+"/adv_gui.column_query",
                                     {table_name: this.table_name, column_name: this.column_name})
            this.items = r;
        }

        click_create_excel() {
            genexcel(this.items);
        }
        scrollo() {
            var sp = this.$.list.scrollLeft;
            if (!this.requested) {
                this.requested = true;
                var me = this
                window.requestAnimationFrame(function(x) {
                    me.$.tab_container.scrollLeft = sp;
                    me.requested = false;
                });
            } else {
                console.log("skipped");
            }
        }
    }
    window.customElements.define(AdvgColumnQuery.is, AdvgColumnQuery);

    function genexcel(items) {
        var excel = $JExcel.new("Calibri light 10 #333333");
        excel.set( {sheet:0,value:"These are the tables" } );
        var headers = ["Owner", "Table Name", "Column Name", "Data Type", "Data Length"];
        var formatHeader=excel.addStyle ( { 															// Format for headers
	    border: "none,none,none,thin #333333", 													// 		Border for header
	    font: "Calibri 12 #0000AA B"}); 														// 		Font for headers
	for (var i=0;i<headers.length;i++){																// Loop all the haders
	    excel.set(0,i,0,headers[i],formatHeader);													// Set CELL with header text, using header format
	    excel.set(0,i,undefined,"auto");															// Set COLUMN width to auto (according to the standard this is only valid for numeric columns)
	}
        var numStyle = excel.addStyle({align: "R"});
        for(var i = 0;i<items.length;i++) {
            var r = items[i];
            excel.set(0,0,i+1, r.owner);
            excel.set(0,1,i+1, r.table_name);
            excel.set(0,2,i+1, r.column_name);
            excel.set(0,3,i+1, r.data_type);
            excel.set(0,4,i+1, r.data_length);//, numStyle);  
        }
        excel.generate("columns.xlsx");
    }
