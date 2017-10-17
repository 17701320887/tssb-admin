<%--
  Created by IntelliJ IDEA.
  User: wangwei
  Date: 2016/10/28
  Time: 18:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page pageEncoding="utf-8" language="java" %>

<%-- 修改员工 --%>
<div class="modal fade" id="identity-update-alert">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></a>
                    </div>
                    <h4 class="panel-title">修改员工</h4>
                </div>
            </div>
            <div class="panel-body">
                <form id="updateIdentityForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                    <input type="hidden" id="hid_authorityUserId">

                    <div class="form-group">
                        <label class="col-md-3 control-label">员工263邮箱</label>

                        <div class="col-md-9">
                            <label id="info_email" class="control-label"/>
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-md-3 control-label">员工手机</label>

                        <div class="col-md-9">
                            <label id="info_mobile" class="control-label"/>
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-md-3 control-label">员工姓名</label>

                        <div class="col-md-9">
                            <label id="info_name" class="control-label"/>
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-md-3 control-label">员工工号</label>

                        <div class="col-md-9">
                            <label id="info_num" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                   class="control-label"/>

                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">员工职位</label>

                        <div class="col-md-9">
                            <!--'1:老师，2：教务 3：销售 4：财务 5：技术 6：其他'; -->
                            <div class="col-md-4">
                                <label class="radio-inline">
                                    <input name="update_position" value="1" type="radio">
                                    老师
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label class="radio-inline">
                                    <input name="update_position" value="2" type="radio">
                                    教务
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label class="radio-inline">
                                    <input name="update_position" value="3" type="radio">
                                    销售
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label class="radio-inline">
                                    <input name="update_position" value="4" type="radio">
                                    财务
                                </label>

                            </div>
                            <div class="col-md-4">
                                <label class="radio-inline">
                                    <input name="update_position" value="5" type="radio">
                                    技术
                                </label>
                            </div>

                            <div class="col-md-4">
                                <label class="radio-inline">
                                    <input name="update_position" value="6" type="radio">
                                    其他
                                </label>
                            </div>

                            <ul class="parsley-errors-list filled">
                                <li class="parsley-required" name="ErrorTip"></li>
                            </ul>
                        </div>


                        <div id="live_teacher_part" style="display:none;margin-top:30px">


                            <h4 class="m-t-0">对啊直播课堂使用信息配置</h4>

                            <div class="form-group">
                                <label class="col-md-3 control-label">是否启用</label>

                                <div class="col-md-9">
                                    <!--'1:老师，2：教务 3：销售 4：财务 5：技术 6：其他'; -->
                                    <label class="radio-inline">
                                        <input name="update_enable" value="1" type="radio">
                                        启用
                                    </label>

                                    <label class="radio-inline">
                                        <input name="update_enable" value="2" type="radio">
                                        停用
                                    </label>

                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">使用SKU</label>

                                <div class="col-md-9">
                                    <select id="update_sku" class="form-control">
                                        <c:forEach items="${skuList}" var="sku">
                                            <%--<shiro:hasPermission name="identity:find:${sku.id}">--%>
                                                <option value="${sku.id}">${sku.dicName}</option>
                                            <%--</shiro:hasPermission>--%>
                                        </c:forEach>
                                    </select>

                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>

                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">排序</label>

                                <div class="col-md-9">
                                    <select id="update_sort" class="form-control">
                                        <option value="-1">--排序--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>

                                    </select>
                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">老师昵称</label>

                                <div class="col-md-9">
                                    <input id="update_teacher_nike" class="form-control" type="text">
                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">教学特点</label>

                                <div class="col-md-9">
                                    <textarea id="update_teacher_feature" class="form-control" rows="5"></textarea>
                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">听课课程ID</label>

                                <div class="col-md-9">
                                    <input id="update_lesson_id" class="form-control" type="text">
                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">听课课程（标题）</label>

                                <div class="col-md-9">
                                    <input id="update_lesson_title" class="form-control" type="text">
                                    <ul class="parsley-errors-list filled">
                                        <li class="parsley-required" name="ErrorTip"></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">老师封面</label>

                                <div class="col-md-9"><!-- teacher_img_url -->

                                    <div id="uploaddiv_11" class="col-xs-2 col-sm-2 col-md-2 thumbnail"
                                         style="margin-bottom:0px;width:inherit">
                                        <input type="hidden" id="teacherImgUrl" value=""/>
                                        <img alt="请上传图片 尺寸450*460px" id="teacherImgUrl_img" class="photo-style"
                                             data-holder-rendered="true" src="">

                                        <div class="progress progress-striped active progress_div" role="progressbar"
                                             aria-valuemin="10"
                                             aria-valuemax="100" aria-valuenow="0" style="display:none">
                                            <div class="progress-bar progress-bar-success pic_progress"
                                                 style="width:0%;" style="display:none"></div>
                                        </div>
                                        <div class="caption" align="center">
                                    <span class="btn btn-primary fileinput-button">
                                    <span>上传</span>
                                    <input type="file" data_pic_width="450" data_pic_height="460" data-id="teacherImgUrl" id="uploadImage_11" class="uploadImage"
                                           multiple>
                                    </span>


                                            <ul class="parsley-errors-list filled">
                                                <li class="parsley-required" name="ErrorTip"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">课程封面</label>

                                <div class="col-md-9"><!-- course_img_url -->
                                    <div id="uploaddiv_12" class="col-xs-2 col-sm-2 col-md-2 thumbnail"
                                         style="margin-bottom:0px;width:inherit">
                                        <input type="hidden" id="courseImgUrl" value=""/>
                                        <img alt="请上传图片 尺寸190*106px" id="courseImgUrl_img" class="photo-style"
                                             data-holder-rendered="true" src="">

                                        <div class="progress progress-striped active progress_div" role="progressbar"
                                             aria-valuemin="10"
                                             aria-valuemax="100" aria-valuenow="0" style="display:none">
                                            <div class="progress-bar progress-bar-success pic_progress"
                                                 style="width:0%;" style="display:none"></div>
                                        </div>
                                        <div class="caption" align="center">
                                    <span class="btn btn-primary fileinput-button">
                                    <span>上传</span>
                                    <input type="file" data-id="courseImgUrl"  data_pic_width="190" data_pic_height="106" id="uploadImage_12" class="uploadImage"
                                           multiple>
                                    </span>
                                            <ul class="parsley-errors-list filled">
                                                <li class="parsley-required" name="ErrorTip"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-3 control-label">首页公开课列表</label>

                                <div class="col-md-9"><!-- app_img_url -->
                                    <div id="uploaddiv_13" class="col-xs-2 col-sm-2 col-md-2 thumbnail"
                                         style="margin-bottom:0px;width:inherit">
                                        <input type="hidden" id="appImgUrl" value=""/>
                                        <img alt="请上传图片 尺寸226 x 225px" id="appImgUrl_img" class="photo-style"
                                             data-holder-rendered="true" src="">

                                        <div class="progress progress-striped active progress_div" role="progressbar"
                                             aria-valuemin="10"
                                             aria-valuemax="100" aria-valuenow="0" style="display:none">
                                            <div class="progress-bar progress-bar-success pic_progress"
                                                 style="width:0%;" style="display:none"></div>
                                        </div>
                                        <div class="caption" align="center">
                                    <span class="btn btn-primary fileinput-button">
                                    <span>上传</span>
                                    <input type="file" data-id="appImgUrl" data_pic_width="226" data_pic_height="225" id="uploadImage_13" class="uploadImage"
                                           multiple>
                                    </span>
                                            <ul class="parsley-errors-list filled">
                                                <li class="parsley-required" name="ErrorTip"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a id="update_saveIdentity" href="javascript:;" class="btn btn-sm btn-success">修改</a>
                <a id="update_close" href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal">取消</a>
            </div>
        </div>
    </div>
</div>