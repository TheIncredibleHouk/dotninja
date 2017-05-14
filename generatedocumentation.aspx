<%@ Page Language="C#" AutoEventWireup="true" CodeFile="generatedocumentation.aspx.cs" Inherits="generatedocumentation" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        File Path:<br /><asp:TextBox Columns="50" runat="server" ID="file" /><br />
        Documentation Path:<br /><asp:TextBox  Columns="50" runat="server" ID="documentation" /><Br />
        <asp:Button Text="Generate" runat="server" OnClick="Generate" />
        <asp:Label ID="errors" runat="server" />
    </form>
</body>
</html>
