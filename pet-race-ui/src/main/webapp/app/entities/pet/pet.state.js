(function() {
    'use strict';

    angular
        .module('gpmrApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pet', {
            parent: 'entity',
            url: '/pet',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Pets'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pet/pets.html',
                    controller: 'PetController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('pet-detail', {
            parent: 'entity',
            url: '/pet/{petId}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Pet'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pet/pet-detail.html',
                    controller: 'PetDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Pet', function($stateParams, Pet) {
                    return Pet.get({petId : $stateParams.petId});
                }]
            }
        })
        .state('pet.new', {
            parent: 'pet',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-dialog.html',
                    controller: 'PetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                petId: null,
                                name: null,
                                description: null,
                                petCategoryName: null,
                                petCategoryId: null,
                                petSpeed: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pet', null, { reload: true });
                }, function() {
                    $state.go('pet');
                });
            }]
        })
        .state('pet.edit', {
            parent: 'pet',
            url: '/{petId}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-dialog.html',
                    controller: 'PetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pet', function(Pet) {
                            return Pet.get({petId : $stateParams.petId});
                        }]
                    }
                }).result.then(function() {
                    $state.go('pet', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pet.delete', {
            parent: 'pet',
            url: '/{petId}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-delete-dialog.html',
                    controller: 'PetDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pet', function(Pet) {
                            return Pet.get({petId : $stateParams.petId});
                        }]
                    }
                }).result.then(function() {
                    $state.go('pet', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
