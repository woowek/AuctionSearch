<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Insert title here</title>
    </head>

    <body>

        <h3 class="title">기본 검색 옵션</h3>
        <div class="option-box">
            <table>
                <colgroup>
                    <col style="width:96px;">
                    <col style="width:207px;">
                    <col style="width:99px;">
                    <col style="width:207px;">
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">아이템 명</th>
                        <td colspan="3"><input type="text" id="txtItemNameDetail" placeholder="아이템 명을 입력해주세요."
                                maxlength="20"></td>
                    </tr>
                    <tr>
                        <th scope="row">카테고리</th>
                        <td>
                            <div id="selCategoryDetail" class="lui-select select--deal-category">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">
                                    <label role="option" tabindex="0" class="lui-select__label--selected"><input
                                            type="radio" name="deal-category-detail" value="0,0"
                                            data-selected="selected">전체 카테고리</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,0">장비 - 전체</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,180000">장비 - 무기</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,190010">장비 - 투구</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,190020">장비 - 상의</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,190030">장비 - 하의</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,190040">장비 - 장갑</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="10000,190050">장비 - 어깨</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="30000,0">어빌리티 스톤 - 전체</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="200000,0">장신구 - 전체</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="200000,200010">장신구 - 목걸이</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="200000,200020">장신구 - 귀걸이</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="200000,200030">장신구 - 반지</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="200000,200040">장신구 - 팔찌</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-category-detail"
                                            value="210000,0">보석 - 전체</label>
                                </div>
                            </div>
                        </td>
                        <th scope="row">직업</th>
                        <td>
                            <div id="selClassDetail" class="lui-select select--deal-class">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">
                                    <label role="option" tabindex="0" class="lui-select__label--selected"><input
                                            type="radio" name="deal-classNo-detail" value="" data-selected="selected">전체
                                        직업</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="102">버서커</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="103">디스트로이어</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="104">워로드</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="105">홀리나이트</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="202">아르카나</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="203">서머너</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="204">바드</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="302">배틀마스터</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="303">인파이터</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="304">기공사</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="305">창술사</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="312">스트라이커</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="402">블레이드</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="403">데모닉</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="404">리퍼</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="502">호크아이</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="503">데빌헌터</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="504">블래스터</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="505">스카우터</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-classNo-detail"
                                            value="512">건슬링어</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">아이템 등급</th>
                        <td>
                            <div class="lui-select select--deal-grade">
                                <div class="lui-select__title" tabindex="0"><span>전체 등급</span></div>
                                <div class="lui-select__option" role="listbox">
                                    <label role="option" tabindex="0" class="lui-select__label--selected"><input
                                            type="radio" name="deal-grade-detail" value="" data-selected="selected">전체
                                        등급</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-grade-detail"
                                            value="0"><span data-grade="0">일반</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-grade-detail"
                                            value="1"><span data-grade="1">고급</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-grade-detail"
                                            value="2"><span data-grade="2">희귀</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-grade-detail"
                                            value="3"><span data-grade="3">영웅</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-grade-detail"
                                            value="4"><span data-grade="4">전설</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-grade-detail"
                                            value="5"><span data-grade="5">유물</span></label>
                                </div>
                            </div>
                        </td>
                        <th scope="row">아이템 레벨</th>
                        <td>
                            <div class="item-level">
                                <input type="number" id="txtItemLevelMinDetail" name="deal-itemMinLevel-detail"
                                    class="input input--deal-item-level-min" min="0" max="1600" placeholder="0"
                                    value="">
                                <span>~</span>
                                <input type="number" id="txtItemLevelMaxDetail" name="deal-itemMaxLevel-detail"
                                    class="input input--deal-item-level-max" min="0" max="1600" placeholder="1600"
                                    value="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">아이템 티어</th>
                        <td>
                            <div class="lui-select select--deal-itemtier" data-uid="kghltk2k">
                                <div class="lui-select__title" tabindex="0"><span>전체 티어</span></div>
                                <div class="lui-select__option" role="listbox">
                                    <label role="option" tabindex="0" class="lui-select__label--selected"><input
                                            type="radio" name="deal-itemtier-detail" value=""
                                            data-selected="selected">전체 티어</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-itemtier-detail"
                                            value="1"><span data-itemtier="1">티어 1</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-itemtier-detail"
                                            value="2"><span data-itemtier="2">티어 2</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-itemtier-detail"
                                            value="3"><span data-itemtier="3">티어 3</span></label>
                                </div>
                            </div>
                        </td>
                        <th scope="row">품질</th>
                        <td>
                            <div class="lui-select select--deal-quality">
                                <div class="lui-select__title" tabindex="0"><span>전체 품질</span></div>
                                <div class="lui-select__option" role="listbox">
                                    <label role="option" tabindex="0" class="lui-select__label--selected"><input
                                            type="radio" name="deal-quality-detail" value="" data-selected="selected">전체
                                        품질</label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="10"><span data-quality="10">10 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="20"><span data-quality="20">20 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="30"><span data-quality="30">30 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="40"><span data-quality="40">40 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="50"><span data-quality="50">50 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="60"><span data-quality="60">60 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="70"><span data-quality="70">70 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="80"><span data-quality="80">80 이상</span></label>
                                    <label role="option" tabindex="0"><input type="radio" name="deal-quality-detail"
                                            value="90"><span data-quality="90">90 이상</span></label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3 class="title">스킬 상세 옵션</h3>
        <div class="option-box">
            <table>
                <colgroup>
                    <col style="width:204px;">
                    <col style="width:200px;">
                    <col style="width:206px;">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">스킬 선택</th>
                        <th scope="col">옵션 선택</th>
                        <th scope="col">수치 설정</th>
                    </tr>
                </thead>
                <tbody id="skillOptions">
                    <tr>
                        <td>
                            <div id="selSkill_0" name="selSkill" class="lui-select select--deal-skill">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selSkillSub_0" name="selSkillSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtSkillMin_0" name=txtSkillMin
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span id="txtSkillMinSymbol_0">~</span>
                                <input type="number" id="txtSkillMax_0" name=txtSkillMax
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="">
                                <b id="txtSkillMaxSymbol_0"></b>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="selSkill_1" name="selSkill" class="lui-select select--deal-skill">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selSkillSub_1" name="selSkillSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtSkillMin_1" name=txtSkillMin
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span id="txtSkillMinSymbol_1">~</span>
                                <input type="number" id="txtSkillMax_1" name=txtSkillMax
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="">
                                <b id="txtSkillMaxSymbol_1"></b>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="selSkill_2" name="selSkill" class="lui-select select--deal-skill">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selSkillSub_2" name="selSkillSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtSkillMin_2" name=txtSkillMin
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span id="txtSkillMinSymbol_2">~</span>
                                <input type="number" id="txtSkillMax_2" name=txtSkillMax
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="">
                                <b id="txtSkillMaxSymbol_2"></b>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3 class="title">기타 상세 옵션</h3>
        <div class="option-box">
            <table>
                <colgroup>
                    <col style="width:204px;">
                    <col style="width:200px;">
                    <col style="width:206px;">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">기타 선택</th>
                        <th scope="col">옵션 선택</th>
                        <th scope="col">수치 설정</th>
                    </tr>
                </thead>
                <tbody id="etcOptions">
                    <tr>
                        <td>
                            <div id="selEtc_0" name="selEtc" class="lui-select select--deal-etc">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selEtcSub_0" name="selEtcSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtEtcMin_0" name="txtEtcMin"
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span>~</span>
                                <input type="number" id="txtEtcMax_0" name="txtEtcMax"
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="selEtc_1" name="selEtc" class="lui-select select--deal-etc">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selEtcSub_1" name="selEtcSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtEtcMin_1" name="txtEtcMin"
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span>~</span>
                                <input type="number" id="txtEtcMax_1" name="txtEtcMax"
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="selEtc_2" name="selEtc" class="lui-select select--deal-etc">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selEtcSub_2" name="selEtcSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtEtcMin_2" name="txtEtcMin"
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span>~</span>
                                <input type="number" id="txtEtcMax_2" name="txtEtcMax"
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="selEtc_3" name="selEtc" class="lui-select select--deal-etc">
                                <div class="lui-select__title" tabindex="0">전체</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="selEtcSub_3" name="selEtcSub" class="lui-select select--deal-option">
                                <div class="lui-select__title" tabindex="0">없음</div>
                                <div class="lui-select__option" role="listbox">

                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="item-mumerical">
                                <input type="number" id="txtEtcMin_3" name="txtEtcMin"
                                    class="input input--deal-item-mumerical-min" placeholder="최소 수치" value="" />
                                <span>~</span>
                                <input type="number" id="txtEtcMax_3" name="txtEtcMax"
                                    class="input input--deal-item-mumerical-max" placeholder="최대 수치" value="" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="preset">
            <h3 class="preset__title">검색 프리셋<span class="info">!</span><span class="tooltip">게임과 공식 홈페이지의 검색 프리셋은<br>동기화
                    되지 않아 별도 설정이 필요합니다.</span></h3>
            <div class="preset__list" style="display:none;">
                <button type="button" class="button button--preset-save" disabled>검색 옵션 저장</button>
            </div>
            <div class="preset__login">
                <p class="dsc">로그인 후 <br>검색 프리셋 설정이 가능합니다.</p>
                <a href="https://member.onstove.com/auth/login?inflow_path=lost_ark&amp;game_no=45&amp;redirect_url=https%3a%2f%2flostark.game.onstove.com%2fAuction"
                    class="button button--event-login">로그인</a>
            </div>

        </div>
    </body>

    </html>