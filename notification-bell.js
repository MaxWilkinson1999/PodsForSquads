var app = angular.module('notificationApp', ['ngAnimate']);
app.controller('notificationController', function($scope) {
    var opendd;
    var storedNewNotifications;
    var storedReadNotifications;
    var storedawaitingNotifications;

    var init = function() {
        storedNewNotifications = JSON.parse(localStorage.getItem('newNotifications'));
        storedReadNotifications = JSON.parse(localStorage.getItem('readNotifications'));
        storedawaitingNotifications = JSON.parse(localStorage.getItem('awaitingNotifications'));

        if (storedNewNotifications == null) {
            $scope.newNotifications = [{
                user: pollingData.users[1],
                action: pollingData.actions[0],
                target: pollingData.actionTargets[2],
                timestamp: new Date()
            }];
        } else {
            $scope.newNotifications = storedNewNotifications;
        }

        if (storedReadNotifications == null) {
            $scope.readNotifications = [{
                user: pollingData.users[2],
                action: pollingData.actions[1],
                target: pollingData.actionTargets[0],
                timestamp: new Date()
            }];
        } else {
            $scope.readNotifications = storedReadNotifications;
        }

        if (storedawaitingNotifications == null) {
            $scope.awaitingNotifications = 1;
        } else {
            $scope.awaitingNotifications = storedawaitingNotifications;
            if ($scope.awaitingNotifications == 0) {
                angular.element('#notifications-count').hide();
            }
        }

        $scope.showNotifications = function($event) {
            var targetdd = angular.element($event.target).closest('.notification-bell').find('.dropdown-menu');
            opendd = targetdd;
            if (targetdd.hasClass('fadeInDown')) {
                hidedd(targetdd);
            } else {
                targetdd.css('display', 'block').removeClass('fadeOutUp').addClass('fadeInDown')
                    .on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                        angular.element(this).show();
                    });
                targetdd.find('.dropdown-body')[0].scrollTop = 0;
                $scope.awaitingNotifications = 0;
                angular.element('#notifications-count').removeClass('fadeIn').addClass('fadeOut');
            }
        };

        $scope.hideInfo = function() {
            angular.element('#demoInfo').addClass('zoomOut')
                .on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                    angular.element(this).hide();
                    angular.element('.instruction').addClass('zoomIn').show();
                });
        }

        setInterval(function() {
            if ($scope.awaitingNotifications > 0 && opendd == null && (angular.element('#notifications-count').css('opacity') == '0' || angular.element('#notifications-count').is(':hidden')))
                angular.element('#notifications-count').removeClass('fadeOut').addClass('fadeIn').show();
        }, 400);

        dummyPolling();
    }

    var hidedd = function(targetdd) {
        targetdd.removeClass('fadeInDown').addClass('fadeOutUp')
            .on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                angular.element(this).hide();
            });
        opendd = null;
        $scope.awaitingNotifications = 0;
        angular.forEach($scope.newNotifications, function(notification) {
            $scope.readNotifications.push(notification);
        });
        $scope.newNotifications = [];
        localStorage.setItem('readNotifications', JSON.stringify($scope.readNotifications));
        localStorage.setItem('newNotifications', JSON.stringify($scope.newNotifications));
        localStorage.setItem('awaitingNotifications', JSON.stringify($scope.awaitingNotifications));
        if ($scope.awaitingNotifications > 0)
            angular.element('#notifications-count').removeClass('fadeOut').addClass('fadeIn');
    }

    var pollingData = {
        users: [{
                name: "Fauzan Khan",
                imageUrl: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAANfAAAAJDE1MzNiYjM1LWVjYzUtNDcwZi1hMmExLTQ5ZDVjYzViMDkzYQ.jpg"
            },
            {
                name: "Keanu Reeves",
                imageUrl: "http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
            },
            {
                name: "Natalie Portman",
                imageUrl: "https://imagemoved.files.wordpress.com/2011/07/no-strings-attached-natalie-portman-19128381-850-1280.jpg"
            }
        ],
        actions: ["upvoted", "promoted", "shared"],
        actionTargets: ["your answer", "your post", "your question"]
    };

    var getRandomNumber = function() {
        return Math.floor(Math.random() * 3);
    };

    var getNewNotification = function() {
        var userIndex = getRandomNumber();
        var actionIndex = getRandomNumber();
        var actionTargetIndex = getRandomNumber();
        var newNotification = {
            user: pollingData.users[userIndex],
            action: pollingData.actions[actionIndex],
            target: pollingData.actionTargets[actionTargetIndex],
            timestamp: new Date()
        }
        return newNotification;
    };

    var dummyPolling = function() {
        var randomInterval = 2 * Math.round(Math.random() * (3000 - 500)) + 1000;
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.newNotifications.push(getNewNotification());
                $scope.awaitingNotifications++;
                localStorage.setItem('newNotifications', JSON.stringify($scope.newNotifications));
                localStorage.setItem('awaitingNotifications', JSON.stringify($scope.awaitingNotifications));
            });
            console.log("dummy poll called after " + randomInterval + "ms");
            dummyPolling();
        }, randomInterval);
    }

    window.onclick = function(event) {
        var clickedElement = angular.element(event.target);
        var clickedDdTrigger = clickedElement.closest('.bell-icon').length;
        var clickedDdContainer = clickedElement.closest('.dropdown-menu').length;
        if (opendd != null && clickedDdTrigger == 0 && clickedDdContainer == 0) {
            hidedd(opendd);
        }
    }

    window.onbeforeunload = function(e) {
        if (opendd != null) {
            console.log('closingdd');
            hidedd(opendd);
        }
    };

    init();
});
