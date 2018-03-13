<%@ page pageEncoding="utf-8"  language="java" %>
<%-- 新增员工 --%>
<div class="modal fade" id="matic-create-alert">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="panel-title">新闻发布</h4>
                </div>
            </div>
            <div class="panel-body">
                <form id="userForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                    <div class="form-group">
                        <label class="col-md-3 control-label">标题</label>
                        <div class="col-md-9">
                            <input id="title" type="text"  class="form-control"/>
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">模式</label>
                        <div class="col-md-9">
                            <label class="radio-inline">
                                <input type="radio" name="maticType" id="inlineRadio1" value="option1" style="margin-top: 1.5px;" checked> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="maticType" id="inlineRadio2" value="option2" style="margin-top: 1.5px;"> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="maticType" id="inlineRadio3" value="option3" style="margin-top: 1.5px;"> 3
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">内容</label>
                        <div class="col-md-9">
                            <textarea id="content" class="form-control" rows="10">
                            </textarea>
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">图片</label>
                        <div class="col-md-9">
                            <input type="file" id="imgUrl" />
                            <ul  class="parsley-errors-list filled">
                                <li name="ErrorTip" class="parsley-required"></li>
                            </ul>
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