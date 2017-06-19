export default ({body}) => `<html>
<head>
</head>
<body>
    <div id="root">
        ${body}
    </div>
    <script src="/dist/client/index.js"></script>
</body>
</html>
`;
