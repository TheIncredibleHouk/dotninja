<%@ Page Language="C#" AutoEventWireup="true" CodeFile="visuals.aspx.cs" Inherits="test_ninja" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style title="text/css">
        a.select
        {
            padding: 1px;
            font-size: 10pt;
            font-family: Arial;
            cursor: default;
            color: #000000;
            text-decoration: none;
            border: 1px solid #c0c0c0;
        }
        
        div.select
        {
            border: 1px solid #000000;
            font-family: Arial;
            font-size: 10pt;
        }
        
        div.select > div
        {
            padding-left: 2px;
            cursor: default;
            padding-right: 16px;
        }
        
        div.select > div:hover
        {
            color: #ffffff;
            background-color: #336699;
        }
        
    </style>
    <script type="text/javascript" src="/scripts/NinJa.js"></script>
    <script type="text/javascript" src="/scripts/NinJaList.js"></script>
</head>
<body>
<select id="test">
    <option value="red">Red</option>
    <option value="orange">Orange</option>
    <option value="yellow">Yellow</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
    <option value="purple">Purple</option>
</select>
</body>
</html>
