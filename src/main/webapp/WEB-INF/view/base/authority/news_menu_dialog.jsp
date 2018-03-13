<%@ page pageEncoding="utf-8"  language="java" %>
<%-- 新增类目 --%>
<div class="modal fade" id="menu-create-alert">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="panel-title">新增类目</h4>
                </div>
            </div>
            <div class="panel-body">
                <form id="userForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                    <div class="form-group">
                        <label class="col-md-3 control-label">类目CODE</label>
                        <div class="col-md-9">
                            <input id="code" type="text"  class="form-control"/>
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">类目名称</label>
                        <div class="col-md-9">
                            <input id="codeName" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a id="close" href="javascript:;" class="btn btn-sm btn-info" data-dismiss="modal">关闭</a>
                <a id="saveMenu"  href="javascript:;" class="btn btn-sm btn-success">保存</a>
            </div>
        </div>
    </div>
</div>