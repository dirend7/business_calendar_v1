package com.end.demo.controllor;

import com.end.demo.service.UserService;
import com.end.demo.vo.CalendarVO;
import com.end.demo.vo.XhrVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;


@Controller
public class UserController {

    @Autowired
    UserService service;

    @RequestMapping(value = {"/", "login"})
    public ModelAndView getIndex(Principal principal) {
        /* String encoded = new BCryptPasswordEncoder().encode("asd");
        System.out.println(encoded); 암호화 로그 확인 */
        ModelAndView mv = new ModelAndView();
        if (principal != null) {
            mv.addObject("session", principal.getName());
        }
        mv.addObject("page", "fragments/indexPage");//html templates
        mv.addObject("templates", "indexPage");//css
        mv.addObject("pageTitle", "index");
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping("/accept")
    public ModelAndView getAccept(Principal principal) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("page", "fragments/accept");//html templates
        mv.addObject("templates", "accept");//css
        mv.addObject("pageTitle", "accept");
        mv.addObject("etc", service.getEtc(principal.getName()));
        mv.addObject("session", principal.getName());
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping(value = "/accept/insert", method = RequestMethod.POST)
    public String insertCalendar(CalendarVO cVo) {
        System.out.println(cVo);
        service.insertCalendar(cVo);
        return "redirect:/accept";
    }

    @RequestMapping(value = "/accept/xhr", method = RequestMethod.POST)
    @ResponseBody
    public List<CalendarVO> getXhrList(XhrVO values) {
        return service.getCalendar(values);
    }

    @RequestMapping("/check")
    public ModelAndView getCheck(Principal principal,@RequestParam int page) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("page", "fragments/check");//html templates
        mv.addObject("templates", "check");//css
        mv.addObject("pageTitle", "check");
        mv.addObject("session", principal.getName());
        mv.addObject("etc", service.getEtc(principal.getName()));
        mv.addObject("maxCountList",service.maxCountList());
        mv.addObject("list", service.getList(principal.getName(),page));
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String updateDelete(@RequestParam List<Integer> i,int page) {
        service.updateDelete(i);
        return "redirect:check?page="+page;
    }

    @RequestMapping(value = "/agree", method = RequestMethod.POST)
    public String updateAgree(@RequestParam List<Integer> i,String agree_flag,int page) {
        HashMap<String, Object> param = new HashMap<String,Object>();
        param.put("agree_flag",agree_flag);
        param.put("listInteger",i);
        service.updateAgree(param);
        return "redirect:check?page="+page;
    }

    @RequestMapping(value = "/detail")
    public ModelAndView detailView(int i, Principal principal) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("vo", service.getDetail(i));
        mv.addObject("page", "fragments/detail");//html templates
        mv.addObject("templates", "detail");//css
        mv.addObject("pageTitle", "detail");
        mv.addObject("session", principal.getName());
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public ModelAndView getUpdate(int i, Principal principal) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("vo", service.getDetail(i));
        mv.addObject("page", "fragments/update");//html templates
        mv.addObject("templates", "update");//css
        mv.addObject("pageTitle", "update");
        mv.addObject("session", principal.getName());
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String updateForm(CalendarVO cvo) {
        service.updateForm(cvo);
        return "redirect:detail?i=" + cvo.getI();
    }
}
