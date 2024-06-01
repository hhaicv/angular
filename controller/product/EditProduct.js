window.EditProduct = function ($scope, $http, $routeParams, $location) {
    var apiCategory = 'http://localhost:3000/category';
    var apiProduct = 'http://localhost:3000/products';
    var id = $routeParams.id;

    $http.get(apiCategory).then(function ($res) {
        $scope.category = $res.data
    })

    $scope.getDetail = function () {
        $http.get(`${apiProduct}/${id}`).then(function ($response) {
            console.log($response);
            $scope.p = $response.data; //gán cho trang chi tiết
            $scope.inputValue = {
                name: $response.data.name,
                descrition: $response.data.descrition,
                price: $response.data.price,
                price_sale: $response.data.price_sale,
                image: $response.data.image,
                gb: $response.data.gb,
                id_dm: $response.data.id_dm,
            }
        })
    }

    // $scope.onUpdate = function () {
    //     var updateProduct = {
    //         ...$scope.inputValue
    //     }
    //     $http.put(
    //         `${apiProduct}/${id}`,
    //         updateProduct
    //     ).then(function (res) {
    //         if (res.status == 200) {
    //             $location.path('/product');
    //         }
    //     })
    // }
    $scope.onUpdate = function () {
        //khởi tạo biến valid để kiểm tra dữ liệu hợp lệ
        var valid = true;
        //kiểm tra trường name
        if (!$scope.inputValue //không tồn tại inputValue
            || !$scope.inputValue.name //inputValue.name trống
            || $scope.inputValue.name.length < 6 //inputValue.name ít hơn 6 ký tự
            || $scope.inputValue.name.length > 100 //inputValue.name nhiều hơn 100 ký tự
        ) {
            valid = false;
        }
        //kiểm tra trường description
        if (!$scope.inputValue || !$scope.inputValue.descrition) {
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.image) {
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.gb) {
            valid = false;
        }
        //kiểm tra trường price
        if (!$scope.inputValue || !$scope.inputValue.price) {
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.price_sale) {
            valid = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.id_dm) {
            valid = false;
        }


        if (valid) {
            //lấy dữ liệu từ form
            var updateProduct = {
                ...$scope.inputValue
            }

            $http.put(
                `${apiProduct}/${id}`,
                updateProduct
            ).then(function (res) {
                if (res.status == 200) {
                    alert('Cập nhật sản phẩm thành công');
                    $location.path('/product');
                }
            })
        } else {
            alert('Dữ liệu không hợp lệ');
        }
    }

    $scope.getDetail();
}