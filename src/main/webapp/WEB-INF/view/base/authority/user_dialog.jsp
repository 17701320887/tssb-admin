<%@ page pageEncoding="utf-8"  language="java" %>
<%-- 新增员工 --%>
<div class="modal fade" id="user-create-alert">
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
                            <input id="userWxNo" type="text"  class="form-control"/>
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户手机*</label>
                        <div class="col-md-9">
                            <input id="usermobile" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户姓名*</label>
                        <div class="col-md-9">
                            <input id="username" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户工号*</label>
                        <div class="col-md-9">
                            <input  id="workNo" onkeyup="this.value=this.value.replace(/\D/g,'')"   maxlength="10" minlength="1"   class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户性别*</label>
                        <div class="col-md-9">
                            <div class="switch">
                                <input id="sex" type="checkbox"  data-on-text="男" data-off-text="女" data-on-color="primary"  data-off-color="info"  checked />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">用户权限*</label>
                        <div class="col-md-9">
                                <label class="radio-inline">
                                    <input type="radio" name="role" id="inlineRadio1" value="1" style="margin-top: 1.5px;" checked> 超级管理员
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="role" id="inlineRadio2" value="2" style="margin-top: 1.5px;"> 主编
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="role" id="inlineRadio3" value="3" style="margin-top: 1.5px;"> 普通
                                </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a id="close" href="javascript:;" class="btn btn-sm btn-info" data-dismiss="modal">关闭</a>
                <a id="saveUser"  href="javascript:;" class="btn btn-sm btn-success">保存</a>
            </div>
        </div>
    </div>
</div>

<%-- 修改员工 --%>
<div class="modal fade" id="user-update-alert">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="panel-title">修改员工</h4>
                </div>
            </div>
            <div class="panel-body">
                <form id="updateUserForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                    <input type="hidden" id="userId">
                    <div class="form-group">
                        <label class="col-md-3 control-label">员工263邮箱*</label>
                        <div class="col-md-9">
                            <input id="update_email" type="text"  class="form-control"/>
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">员工手机*</label>
                        <div class="col-md-9">
                            <input id="update_mobile" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">员工姓名*</label>
                        <div class="col-md-9">
                            <input id="update_name" type="text" class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">员工工号*</label>
                        <div class="col-md-9">
                            <input  id="update_num" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="10" minlength="1"  class="form-control" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label">员工性别*</label>
                        <div class="col-md-9">
                            <input id="update_sex" type="checkbox"  data-on-text="男" data-off-text="女" data-on-color="primary"  data-off-color="info"  checked />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">在职状态*</label>
                        <div class="col-md-9">
                            <div class="switch">
                                <input id="status" type="checkbox"  data-on-text="在职" data-off-text="离职" data-on-color="primary"  data-off-color="danger"  checked />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a id="update_close" href="javascript:;" class="btn btn-sm btn-info" data-dismiss="modal">关闭</a>
                <a id="update_saveUser"  href="javascript:;" class="btn btn-sm btn-success">保存</a>
            </div>
        </div>
    </div>
</div>