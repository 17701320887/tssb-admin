package com.tssb.common.util;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MobileLocationUtil {
    /**
     * 归属地查询
     *
     * @param mobile
     * @return mobileAddress
     */
    @SuppressWarnings("unused")
    private static String getLocationByMobile(final String mobile) throws ParserConfigurationException, SAXException, IOException {
        String MOBILEURL = " http://www.youdao.com/smartresult-xml/search.s?type=mobile&q=";
        String result = callUrlByGet(MOBILEURL + mobile, "GBK");
        StringReader stringReader = new StringReader(result);
        InputSource inputSource = new InputSource(stringReader);
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.parse(inputSource);

        if (!(document.getElementsByTagName("location").item(0) == null)) {
            return document.getElementsByTagName("location").item(0).getFirstChild().getNodeValue();
        } else {
            return "无此号记录！";
        }
    }

    /**
     * 获取URL返回的字符串
     *
     * @param callurl
     * @param charset
     * @return
     */
    private static String callUrlByGet(String callurl, String charset) {
        String result = "";
        try {
            URL url = new URL(callurl);
            URLConnection connection = url.openConnection();
            connection.connect();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), charset));
            String line;
            while ((line = reader.readLine()) != null) {
                result += line;
                result += "\n";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        return result;
    }

    /**
     * 手机号码归属地
     *
     * @param tel 手机号码
     * @return 135XXXXXXXX, 联通/移动/电信,湖北武汉
     * @throws Exception
     * @author JIA-G-Y
     */
    public static String getMobileLocation(String tel) throws Exception {
        Pattern pattern = Pattern.compile("1\\d{10}");
        Matcher matcher = pattern.matcher(tel);
        if (matcher.matches()) {
            String url = "http://life.tenpay.com/cgi-bin/mobile/MobileQueryAttribution.cgi?chgmobile=" + tel;
            String result = callUrlByGet(url, "GBK");
            StringReader stringReader = new StringReader(result);
            InputSource inputSource = new InputSource(stringReader);
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            Document document = documentBuilder.parse(inputSource);
            String retmsg = document.getElementsByTagName("retmsg").item(0).getFirstChild().getNodeValue();
            if (retmsg.equals("OK")) {
                String supplier = document.getElementsByTagName("supplier").item(0).getFirstChild().getNodeValue().trim();
                String province = document.getElementsByTagName("province").item(0).getFirstChild().getNodeValue().trim();
                String city = document.getElementsByTagName("city").item(0).getFirstChild().getNodeValue().trim();
                if (province.equals("-") || city.equals("-")) {
                    return (tel + "," + supplier + "," + getLocationByMobile(tel));
                } else {
                    return (tel + "," + supplier + "," + province + city);
                }
            } else {
                return "无此号记录！";
            }
        } else {
            return tel + "：手机号码格式错误！";
        }
    }

    /**
     * IP归属地查询
     *
     * @param ip
     * @return ipAddress
     */
    @SuppressWarnings("unused")
    public static String getLocationByIP(final String ip) throws ParserConfigurationException, SAXException, IOException {
        String MOBILEURL = " http://www.youdao.com/smartresult-xml/search.s?type=ip&q=";
        String result = callUrlByGet(MOBILEURL + ip, "GBK");
        StringReader stringReader = new StringReader(result);
        InputSource inputSource = new InputSource(stringReader);
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.parse(inputSource);

        if (!(document.getElementsByTagName("location").item(0) == null)) {
            return document.getElementsByTagName("location").item(0).getFirstChild().getNodeValue();
        } else {
            return "无此ip记录！";
        }
    }

    public static String getIpbyPconline(String ip) {
        //http://pv.sohu.com/cityjson
        //http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=
        //http://ip.taobao.com/service/getIpInfo.php?ip=127.0.0.1
        //http://whois.pconline.com.cn/jsFunction.jsp?ip=
        String MOBILEURL = "http://whois.pconline.com.cn/ip.jsp?ip=" + ip;
        String result = callUrlByGet(MOBILEURL + ip, "gbk");
        String city[] = result.split(" ");
        if (city.length == 2) {
            return result;
        } else {
            return "无此ip记录！";
        }
    }

    public static void main(String[] args) throws Exception {
        MobileLocationUtil ml = new MobileLocationUtil();
        String resultStr = ml.getIpbyPconline("106.39.118.130");
        System.out.println(resultStr);
        //org.json.simple.JSONObject object = (org.json.simple.JSONObject)JSONValue.parse(resultStr);
        //System.out.println(object);
        //System.out.println(object.get("country"));
        //JSONBuilder builder = new JSONBuilder(resultStr);

//		try {
//			System.out.println(ml.getLocationByMobile("13336211111"));
//			System.out.println(ml.getMobileLocation("13336211111"));
//			System.out.println(ml.getLocationByIP("172.16.105.246"));
//		} catch (ParserConfigurationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (SAXException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    }
}