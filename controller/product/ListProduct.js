window.ListProduct = function ($scope, $http, $location) {
    var apiUrl = 'http://localhost:3000/products';

    var apiCategory = 'http://localhost:3000/category';

    $http.get(apiCategory).then(function ($res) {
        $scope.category = $res.data
    })
    // khai báo hàm
    $scope.getProduct = function () {
        $http.get(apiUrl).then(function ($response) {
            // kiểm tra 
            // console.log($response.data)
            $scope.products = $response.data;
        })
    }

    $scope.getProduct(); // gọi hàm(thực thi)

    $scope.onDetail = function (id) {
        $location.path(`/detail/${id}`)
    }
    $scope.onEdit = function (id) {
        $location.path(`/edit/${id}`);
    }
    $scope.onDelete = function (id) {
        if (confirm('Bạn có muốn xóa không')) {
            $http.delete(`${apiUrl}/${id}`).then(function (res) {
                $scope.getProduct()
            })
        }
    }
}