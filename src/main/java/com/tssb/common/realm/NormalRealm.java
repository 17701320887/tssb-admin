package com.tssb.common.realm;

import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * author: 6
 * date: 13-4-17
 */
public class NormalRealm extends AuthorizingRealm {

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        Integer userId = Integer.parseInt(principals.toString());
//        Users user = iUserService.find(Users.class, userId);
//        if (user != null) {
//            user = iUserService.getUserAllRolsAndPermission(userId);
//            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
////            for (Role role : user.getRoles()) {
////                info.addRole(role.getRoleName());
////            }
//            for (Permission permission : user.getPermissions()) {
//                info.addStringPermission(permission.getPermissionName());
//                info.addRole(permission.getPermissionName());
//            }
//            return info;
//        }
        return null;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        Object principal = usernamePasswordToken.getPrincipal();
        Object credentials = usernamePasswordToken.getCredentials();
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(principal, credentials, getName());
        return info;
    }
}
