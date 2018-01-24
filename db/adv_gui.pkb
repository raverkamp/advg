create or replace package body adv_gui is
  --html_url varchar2(200) := 'http://localhost:8888/poly';
 --  html_url varchar2(200) := 'https://cdn.rawgit.com/raverkamp/advg/master';
  html_url varchar2(200) := 'https://cdn.rawgit.com/raverkamp/advg/master/build/default';
 
  api_url varchar2(200) :=  'http://localhost:8888/dads/user_jp';
  procedure column_query(table_name varchar2, column_name varchar2) as
    c sys_refcursor;
  begin
    open c for select owner, table_name, column_name , data_type, data_length from all_tab_columns c
    where (column_query.table_name is null or c.table_name like column_query.table_name||'%')
      and (column_query.column_name is null or c.column_name like column_query.column_name||'%')
      order by owner, table_name, column_name;
      to_json.cursor_to_json(c);
  end;
  
  procedure demo1_x is
  t varchar2(32000);
  begin
    t := q'[<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

    <title>adv-gui</title>
    <meta name="description" content="adv-gui description">
    <style>
    body {
    height: 100%; 
    width: 100%;
    background:#ddf;
    margin: 0px;
    padding :0px;
    overflow:hidden;
    }
    </style>
    <!-- See https://goo.gl/OOhYW5 -->
    <link rel="manifest" href="/manifest.json">
    <script >
      console.log("url",document.URL);
      var api_url = "$api_url";
    </script>
    <script src="$html_url/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="$html_url/src/advg-column-query/advg-column-query.html">
  </head>
  <body>
    <advg-column-query></advg-column-query>
  </body>
</html>]';
  t := replace(t,'$html_url',html_url);
  t := replace(t,'$api_url',api_url);
  htp.p(t);
  end;
  
  
  procedure render_component(compo varchar2) is
    t varchar2(32000);
  begin
    t := q'[<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

    <title>adv-gui</title>
    <meta name="description" content="adv-gui description">
    <style>
    body {
    height: 100vh; 
    width:100vw;
    background:#ddf;
    margin: 0px;
    padding: 0px;
    border: 0px; 
    }
    # component {
    width: 100%;
    display: 100%;
    }
    </style>
    <!-- See https://goo.gl/OOhYW5 -->
    <link rel="manifest" href="/manifest.json">
    <script >
      console.log("url",document.URL);
      var api_url = "$api_url";
    </script>
    <script src="$html_url/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="$html_url/src/$compo/$compo.html">
  </head>
  <body>
    <$compo id="component"></$compo>
  </body>
</html>]';
  t := replace(t,'$html_url',html_url);
  t := replace(t,'$api_url', api_url);
  t := replace(t, '$compo', compo);
  htp.p(t);
  end;
  
  procedure demo1 is
  begin
    render_component('advg-column-query');
  end;
end;