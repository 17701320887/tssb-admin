<%@ page pageEncoding="utf-8"  language="java" %>
<%-- 新增员工 --%>
<div class="modal fade" id="user-edit-alert">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="panel-title">新增用户</h4>
                </div>
            </div>
            <div class="panel-body">
                <form id="userForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户微信号*</label>
                        <div class="col-md-9">
                            <input id="userWxNo_edit" type="text"  class="form-control"/>
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户手机*</label>
                        <div class="col-md-9">
                            <input id="usermobile_edit" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户姓名*</label>
                        <div class="col-md-9">
                            <input id="username_edit" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户工号*</label>
                        <div class="col-md-9">
                            <input  id="workNo_edit" onkeyup="this.value=this.value.replace(/\D/g,'')"   maxlength="10" minlength="1"   class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <input type="hidden" id="editId" value=""/>
                </form>
            </div>
            <div class="modal-footer">
                <a id="close" href="javascript:;" class="btn btn-sm btn-info" data-dismiss="modal">关闭</a>
                <a id="editUser"  href="javascript:;" class="btn btn-sm btn-success">修改</a>
            </div>
        </div>
    </div>
</div>
