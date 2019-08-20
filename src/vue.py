#!/usr/bin/env python3.6
import os
import argparse
import requests as req

def initialize():
    url_service = 'https://gist.githubusercontent.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5b883d106d60a109252f7f3f5e8ddc1646cdd460/ProductService.js'
    url_component_create = 'https://gist.github.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5caca4ab67f439b509bbb75bfb21867b255d96e5/ProductCreate.vue'
    url_component_destroy = 'https://gist.github.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5b883d106d60a109252f7f3f5e8ddc1646cdd460/ProductDestroy.vue'
    url_component_detail = 'https://gist.github.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5caca4ab67f439b509bbb75bfb21867b255d96e5/ProductDetail.vue'
    url_component_filter = 'https://gist.githubusercontent.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5b883d106d60a109252f7f3f5e8ddc1646cdd460/ProductFilter.vue'
    url_component_list = 'https://gist.githubusercontent.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5b883d106d60a109252f7f3f5e8ddc1646cdd460/ProductList.vue'
    url_component_report = 'https://gist.githubusercontent.com/destodasoftware/227606a84b990b0398c24070d429f748/raw/5b883d106d60a109252f7f3f5e8ddc1646cdd460/ProductReport.vue'

    _Model = input("Pr0duct:\t\t")
    _Models = input("Pr0ducts:\t\t")
    _models = input("pr0ducts:\t\t")
    _model = input("pr0duct:\t\t")

    
    app = "App"
    components = "Components"
    cdir = os.getcwd()
    app_dir = "{cdir}/{Models}/{app}".format(
        cdir=cdir, 
        Models=_Models, 
        app=app
    )
    component_dir = '{cdir}/{Models}/{components}'.format(
        cdir=cdir, 
        Models=_Models, 
        components=components
    )

    os.makedirs(app_dir)

    os.makedirs(component_dir)


    r_service = req.get(url_service).text

    f = open(f'{cdir}/{_Models}/{_Model}Service.js', 'w+')
    r_service = r_service.replace('Pr0ducts', _Models)
    r_service = r_service.replace('Pr0duct', _Model)
    r_service = r_service.replace('pr0ducts', _models)
    r_service = r_service.replace('pr0duct', _model)
    f.write(r_service)
    f.close()

    r_create = req.get(url_component_create).text

    f = open(f'{cdir}/{_Models}/{components}/{_Model}Create.vue', 'w+')
    r_create = r_create.replace('Pr0ducts', _Models)
    r_create = r_create.replace('Pr0duct', _Model)
    r_create = r_create.replace('pr0ducts', _models)
    r_create = r_create.replace('pr0duct', _model)
    f.write(r_create)
    f.close()

    r_destroy = req.get(url_component_destroy).text

    f = open(f'{cdir}/{_Models}/{components}/{_Model}Destroy.vue', 'w+')
    r_destroy = r_destroy.replace('Pr0ducts', _Models)
    r_destroy = r_destroy.replace('Pr0duct', _Model)
    r_destroy = r_destroy.replace('pr0ducts', _models)
    r_destroy = r_destroy.replace('pr0duct', _model)
    f.write(r_destroy)
    f.close()

    r_detail = req.get(url_component_detail).text

    f = open(f'{cdir}/{_Models}/{components}/{_Model}Detail.vue', 'w+')
    r_detail = r_detail.replace('Pr0ducts', _Models)
    r_detail = r_detail.replace('Pr0duct', _Model)
    r_detail = r_detail.replace('pr0ducts', _models)
    r_detail = r_detail.replace('pr0duct', _model)
    f.write(r_detail)
    f.close()

    # filter
    r_filter = req.get(url_component_filter).text

    f = open(f'{cdir}/{_Models}/{components}/{_Model}Filter.vue', 'w+')
    r_filter = r_filter.replace('Pr0ducts', _Models)
    r_filter = r_filter.replace('Pr0duct', _Model)
    r_filter = r_filter.replace('pr0ducts', _models)
    r_filter = r_filter.replace('pr0duct', _model)
    f.write(r_filter)
    f.close()

    # list
    r_list = req.get(url_component_list).text

    f = open(f'{cdir}/{_Models}/{components}/{_Model}List.vue', 'w+')
    r_list = r_list.replace('Pr0ducts', _Models)
    r_list = r_list.replace('Pr0duct', _Model)
    r_list = r_list.replace('pr0ducts', _models)
    r_list = r_list.replace('pr0duct', _model)
    f.write(r_list)
    f.close()

    # report
    r_report = req.get(url_component_report).text

    f = open(f'{cdir}/{_Models}/{components}/{_Model}Report.vue', 'w+')
    r_report = r_report.replace('Pr0ducts', _Models)
    r_report = r_report.replace('Pr0duct', _Model)
    r_report = r_report.replace('pr0ducts', _models)
    r_report = r_report.replace('pr0duct', _model)
    f.write(r_report)
    f.close()

def create_service(project, ):
    pass



if __name__ == '__main__':
    initialize()



