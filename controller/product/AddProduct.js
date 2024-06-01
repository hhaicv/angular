window.AddProduct = function ($scope, $http, $location) {
    var apiProduct = 'http://localhost:3000/products';
    var apiCategory = 'http://localhost:3000/category';

    $http.get(apiCategory).then(function ($res) {
        $scope.category = $res.data
    })



    // $scope.onSubmit = function () {
    //     var newProduct = {
    //         ...$scope.inputValue
    //     }

    //     $http.post(
    //         apiProduct, newProduct
    //     ).then(function ($response) {
    //         if ($response.status == 201) {
    //             $location.path('/product');
    //         }
    //     }, function (errors) {
    //         console.log(errors);
    //     })
    // }

    $scope.onSubmit = function () {
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
            var newProduct = {
                ...$scope.inputValue
            }

            $http.post(
                apiProduct,
                newProduct
            ).then(function ($response) {
                if ($response.status == 201) {
                    alert("Thêm mới thành công");
                    $location.path('/product');
                }
            }, function (errors) {
                console.log(errors);
            })
        } else {
            alert('Dữ liệu không hợp lệ');
        }
    }
}